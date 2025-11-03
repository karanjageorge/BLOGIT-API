import express,{type Request, type Response, type NextFunction} from 'express';
import dotenv from 'dotenv';
import { register,login, logout } from './controllers/auth.ts';//uses the imported control from the auth.ts
import { checkDetails } from './middlewares/checkDetails.ts';
import { checkUserNameAndEmail } from './middlewares/checkUsernameAndEmail.ts';
import { checkPasswordStrength } from './middlewares/CheckPassword.ts';


const app = express();

dotenv.config();
app.use(express.json()) //middleware responsible for making express understand the req body


 

app.get("/", (_req, res) =>{
    res.status(200).send("<h1>Welcome to BlogIt</h1>")
})//we prefix the req with an underscore as we are not using it




app.post('/auth/register',checkDetails,checkUserNameAndEmail,checkPasswordStrength, register);

app.post("/auth/login", login); 
app.post("/auth/logout", logout); 
const PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`App is live at:http://localhost:${PORT}`)
});