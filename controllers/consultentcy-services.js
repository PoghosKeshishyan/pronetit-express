import { prisma } from "../prisma/prisma-client.js";

export const all = async (req, res) => {
    const lang = req.query.lang || '';

    try {
        const services = await prisma.consultentcy_service.findMany(lang && {
            where: { 
                lang,
            },
        });

        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve consultancy services" });
    }
};

export const service = async (req, res) => {
    const id = req.params.id;

    try {
        const consultancyService = await prisma.consultentcy_service.findUnique({
            where: {
                id,
            },
        });

        if (!consultancyService) {
            return res.status(404).json({ message: "Consultancy service not found" });
        }

        res.status(200).json(consultancyService);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve consultancy service" });
    }
};

export const add = async (req, res) => {
    const data = req.body;

    if (
        !data.lang || 
        !data.title || 
        !data.name_label ||
        !data.surname_label || 
        !data.phone_label || 
        !data.email_label ||
        !data.company_label || 
        !data.service_label || 
        !data.name_placeholder ||
        !data.phone_placeholder || 
        !data.message_placeholder ||
        !data.services_placeholder ||
        !data.surname_placeholder || 
        !data.email_placeholder || 
        !data.company_placeholder || 
        !data.button
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const consultancyService = await prisma.consultentcy_service.create({
            data: {
                ...data,
                authorId: req.user.id,
            },
        });

        res.status(201).json(consultancyService);
    } catch (error) {
        res.status(500).json({ message: "Failed to add consultancy service" });
    }
};

export const edit = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const consultancyService = await prisma.consultentcy_service.update({
            where: {
                id,
            },
            data,
        });

        res.status(200).json(consultancyService);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Consultancy service not found" });
        }

        res.status(500).json({ message: "Failed to update consultancy service" });
    }
};

export const remove = async (req, res) => {
    const id = req.params.id;

    try {
        await prisma.consultentcy_service.delete({
            where: {
                id,
            },
        });

        res.status(200).json({ message: "Consultancy service deleted successfully" });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Consultancy service not found" });
        }

        res.status(500).json({ message: "Failed to delete consultancy service" });
    }
};