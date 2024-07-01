const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: true,
  },

  advantages: [
    {
      advantage: {
        type: String,
        required: true,
      },

      discription: {
        type: String,
        required: true,
      }
    }
  ],

  keyFeatures: [],

  useCases: {
    customerSupport: {
      type: String,
      required: true,
    },
    contentCreation: {
      type: String,
      required: true,
    },
    codingAssistance: {
      type: String,
      required: true,
    },
  },

  postCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false
  },


  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },


});


const Post = mongoose.model("Post", postSchema);

module.exports = Post;


// {
//   title: String
//   content: String
//   imagePath:String
//   link:String
//   advantages:[
//   {
//   advantage:String,
//   discription:String
//   }
//   ],
//   keyFeatures:['','',''],
//   useCases:{
//   customerSupport:String,
//   contentCreation:String,
//   codingAssistance:String, 
//   }
// }