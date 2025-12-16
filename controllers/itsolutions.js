import { prisma } from "../prisma/prisma-client.js";

export const all = async (req, res) => {
    const lang = req.query.lang || "";

    try {
        const itsolutions = await prisma.itsolution.findMany({
            where: lang ? { lang } : undefined,
            include: {
                worksTypes: true,
                images: true,
            },
        });

        const formattedItsolutions = itsolutions.map(item => ({
            ...item,
            images: item.images.map(img => ({
                ...img,
                leftColumn: img.leftColumn.map(image => ({
                    ...image,
                    src: `${req.baseFullUrl}${image.src}`
                })),
                rightColumn: img.rightColumn.map(image => ({
                    ...image,
                    src: `${req.baseFullUrl}${image.src}`
                })),
            }))[0],
        }));

        res.status(200).json(formattedItsolutions);
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve itsolutions" });
    }
};

export const itsolution = async (req, res) => {
    const id = req.params.id;

    try {
        const itsolution = await prisma.itsolution.findUnique({
            where: {
                id,
            },
            include: {
                worksTypes: true,
                images: true,
            },
        });

        if (!itsolution) {
            return res.status(404).json({ message: "Itsolution not found" });
        }

        const formattedItsolution = {
            ...itsolution,
            images: itsolution.images.map(img => ({
                ...img,
                leftColumn: img.leftColumn.map(image => ({
                    ...image,
                    src: `${req.baseFullUrl}${image.src}`
                })),
                rightColumn: img.rightColumn.map(image => ({
                    ...image,
                    src: `${req.baseFullUrl}${image.src}`
                })),
            }))[0],
        };

        res.status(200).json(formattedItsolution);
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve itsolution" });
    }
};

export const add = async (req, res) => {
    const { lang, titleSmall, titleBig, description, worksTypes, images } = req.body;

    if (!lang || !titleSmall || !titleBig || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const itsolution = await prisma.itsolution.create({
            data: {
                lang,
                titleSmall,
                titleBig,
                description,
                user: {
                    connect: { id: req.user.id },
                },
                worksTypes: {
                    create: worksTypes || [],
                },
                images: {
                    create: images || [],
                },
            },
            include: {
                worksTypes: true,
                images: true,
            },
        });

        res.status(201).json(itsolution);
    } catch (error) {
        res.status(500).json({ message: "Failed to add itsolution" });
    }
};

export const edit = async (req, res) => {
    const id = req.params.id;
    const { lang, titleSmall, titleBig, description, worksTypes, images } = req.body;

    try {
        const itsolution = await prisma.itsolution.update({
            where: { 
                id,
            },
            data: {
                lang,
                titleSmall,
                titleBig,
                description,
                worksTypes: {
                    deleteMany: {},
                    create: worksTypes || [],
                },
                images: {
                    deleteMany: {},
                    create: images || [],
                },
            },
            include: {
                worksTypes: true,
                images: true,
            },
        });

        res.status(200).json(itsolution);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Itsolution not found" });
        }
        res.status(500).json({ message: "Failed to update itsolution" });
    }
};

export const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.itsolution.delete({
            where: { 
                id,
            },
        });

        res.status(200).json({ message: "Itsolution deleted successfully" });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Itsolution not found" });
        }
        
        res.status(500).json({ message: "Failed to delete itsolution" });
    }
};