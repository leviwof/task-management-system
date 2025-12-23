import Task from "../models/Task.js";

export const getTasks = async (userId, query) => {
    const { status, priority, sort = "createdAt", order = "desc", page = 1, limit = 10 } = query;

    const filter = { createdBy: userId };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tasks = await Task.find(filter)
        .sort({ [sort]: order === "asc" ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));

    const total = await Task.countDocuments(filter);

    return { tasks, total };
};
