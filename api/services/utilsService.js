const jwt = require('jsonwebtoken');
const { isValidObjectId, default: mongoose } = require('mongoose'); 

class UtilityService {
    isObjectId(id) {
        return isValidObjectId(id);
    }
    async deletePdf (id){
        console.log(id)
      try {
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
          bucketName: 'uploads'
        });
    
        const fileId = new mongoose.Types.ObjectId(id);
    
        // Delete the file from GridFS
        await bucket.delete(fileId);
    
      } catch (error) {
        console.error('Delete error:', error);
      }
    };
    
}

module.exports = new UtilityService();
