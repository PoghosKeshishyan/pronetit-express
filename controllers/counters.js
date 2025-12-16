import { prisma } from "../prisma/prisma-client.js";

export const all = async (req, res) => {
    const lang = req.query.lang || "";

    try {
        const counters = await prisma.counter.findMany({
            where: lang ? { lang } : undefined,
            include: {
                counters: true,
            },
        });

        const formattedCounters = counters.map(counter => ({
            ...counter,
            counters: counter.counters.map(item => ({
                ...item,
                image: `${req.baseFullUrl}${item.image}`,
            })),
        }));

        res.status(200).json(formattedCounters);
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve counters" });
    }
};

export const counter = async (req, res) => {
    const id = req.params.id;

    try {
        const counter = await prisma.counter.findUnique({
            where: { 
                id,
            },
            include: {
                counters: true,
            },
        });

        if (!counter) {
            return res.status(404).json({ message: "Counter not found" });
        }

        const formattedCounter = {
            ...counter,
            counters: counter.counters.map(item => ({
                ...item,
                image: `${req.baseFullUrl}${item.image}`,
            })),
        };

        res.status(200).json(formattedCounter);
    } catch (error) {
        res.status(400).json({ message: "Failed to retrieve counter" });
    }
};

export const add = async (req, res) => {
    const { lang, counters } = req.body;

    if (!lang || !counters || !counters.length) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const counter = await prisma.counter.create({
            data: {
                lang,
                user: {
                    connect: {
                        id: req.user.id,
                    },
                },
                counters: {
                    create: counters,
                },
            },
            include: {
                counters: true,
            },
        });

        res.status(201).json(counter);
    } catch (error) {
        res.status(500).json({ message: "Failed to add counter" });
    }
};

export const edit = async (req, res) => {
    const id = req.params.id;
    const { lang, counters } = req.body;

    try {
        const counter = await prisma.counter.update({
            where: { 
                id,
            },
            data: {
                lang,
                counters: {
                    deleteMany: {},
                    create: counters,
                },
            },
            include: {
                counters: true,
            },
        });

        res.status(200).json(counter);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Counter not found" });
        }

        res.status(500).json({ message: "Failed to update counter" });
    }
};

export const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.counter.delete({
            where: { 
                id,
            },
        });

        res.status(200).json({ message: "Counter deleted successfully" });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Counter not found" });
        }

        res.status(500).json({ message: "Failed to delete counter" });
    }
};