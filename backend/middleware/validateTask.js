

function validateTask(req, res, next) {

    const { title, description, priority } = req.body;
    
    if (!title || typeof title !== 'string' || !description || typeof description !== 'string' || !priority || typeof priority !== 'string') {
        return res.status(400).json({ error: 'title,description, priority are required'});
    }

    const allowed = ['low', 'medium', 'high'];

    if (!allowed.includes(priority)) {
        return res.status(400).json({ error: 'priority must be: low, medium, or high'});
    }

    next();

}
module.exports = validateTask;