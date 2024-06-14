 => {
    
    await mongoose.connect(process.env.MONGO_URI as string)
}

export default dbConnect