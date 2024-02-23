import jobsModel from "../models/jobsModel.js"

export const createJobController = async (req, res, next) => {

    const { company, position } = req.body
    if (!company || !position) {
        next('please provide all fields')
    }

    req.body.createdBy = req.user.userId
    const job = await jobsModel.create(req.body)
    res.status(201).json({ job })


}


// get job 
export const getAlljobsController = async (req, res, next) => {

    const jobs = await jobsModel.find({ createdBy: req.user.userId })
    res.status(200).json({
        totaljobs: jobs.length,
        jobs,

    })

}

export const updateJobController = async (req, res, next) => {

    const { id } = req.params
    const { company, position } = req.body
    //validation\

    if (!company || !position) {
        next('please provide all fields')
    }

    //find job
    const job = await jobsModel.findOne({ _id: id })

    //validate
    if (!job) {
        next(`no jobs found with this ${id}`)
    }
    if (req.user.userId !== job.createdBy.toString()) {
        return
        next(`your Not Authorized to update this job`)
    }

    const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({ updateJob })

}

export const deleteJobController = async (req, res, next) => {

    const { id } = req.params
    //find
    const job = await jobsModel.findOne({ _id: id })
    //validate
    if (!job) {
        next(`no job found with this id ${id}`)
    }
    if (!req.user.userId === job.createdBy.toString()) {
        next(' you are not authorize to delete this job')
        return
    }

    await job.deleteOne()
    res.status(200).json({ message: "success,job deleted!!" })


}