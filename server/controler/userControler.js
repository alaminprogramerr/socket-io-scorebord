const bcrypt =require('bcryptjs')
const RegisterModel =require('../model/registerModel')
const userValidator=require('../validator/userValidator')
const jwt=require('jsonwebtoken')



const registerControler=(req, res)=>{
	console.log('request come')
    
    let varify = userValidator.RegisterValidator(req.body)
    if(!varify.isValid){
        return res.status(400).json(varify.err)
    }
	RegisterModel.findOne({email:req.body.email})
	.then(user=>{
		if(user){
			return res.status(400).json({massage:"User allready exist ", status :false})
		}else{
			bcrypt.hash(req.body.password, 12,((err, hash)=>{
				if(err){
					console.log(err)
					res.status(500).json({massage:"Server error occurd "})
				}else{
					const newUser= new RegisterModel({
                        name:req.body.name,
                        email:req.body.email,
						password:hash, 
						score:0
                    })
					newUser.save()
					.then(user=>{
						console.log(user)
						// let token= jwt.sign({name:user.name, email:user.email , _id:user._id} , 'secret' , {expiresIn:'2h'})

						res.json({status:true,massage:"Register Success ", _id:user._id, token:user.name})
					})
					.catch(err=>{
						console.log(err)
					})
				}
			}))
		}
	})
	.catch(err=>{
		console.log(err)
		res.json({massage:"server error occurd "})
	})
}

const loginControler=(req,res)=>{
	console.log('request come',req.body)
    let varify =  userValidator.loginValidator({email:req.body.email, password:req.body.password})
    if(!varify.isValid){
        return res.status(400).json(varify.err)
    }
	RegisterModel.findOne({email:req.body.email})
	.then(user=>{
		if(!user){
		    return	res.status(404).json({massage:"User not found !", status:false});
		}
        bcrypt.compare(req.body.password, user.password)
        .then(result=>{
            if(!result){
                return res.status(400).json({massage:" Wrong password", status:false})
			}
			let payload={name:user.name, email:user.email, id:user._id}
			let token = jwt.sign(payload, "secret" , {expiresIn:'4h'})
            res.status(200).json({massage:"Login successfull !", status:true, userId:user._id , token:user.email  } )
        })
	})
	.catch(err=>{
		console.log(err)
		res.json({err:err})
	})
}
module.exports={
    registerControler,
	loginControler
} 