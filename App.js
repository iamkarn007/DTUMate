import React,  {useState, useEffect}  from "react";
import './App.css';
import Post from './Post';
import "./Post.css";
import {db,auth} from './firebase';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input} from "@material-ui/core";
import ImageUpload from './ImageUpload';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
const classes=useStyles();
const [modalStyle]=useState(getModalStyle);

const [posts, setPosts]=useState([]);
const [open, setOpen]=useState(false);
const [openSignIn, setOpenSignIn]=useState(false);
const [username, setUsername]=useState('')
const [password, setPassword]=useState('');
const [email, setEmail]=useState('');
const [user, setUser]=useState('null');

useEffect(()=>{
  const unsubscribre=auth.onAuthStateChanged((authUser)=>{
    if(authUser)
    {
      console.log(authUser);
      setUser(authUser);
    } 
    else{
      //User loggedout
      setUser(null);
    }
  })
  return()=>{
    //perform cleanup
    unsubscribre();
  }

},[user,username]);


useEffect(()=>{
db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot=>{
  setPosts(snapshot.docs.map(doc=>({
    id: doc.id,
    post: doc.data()
  })
  ));
})
},[]);

const signUp=(event)=>{
  event.preventDefault();
  auth
  .createUserWithEmailAndPassword(email,password)
  .then((authUser)=>{
    return authUser.user.updateProfile({
      displayName:username
    })
  })
  .catch((error)=>alert(error.message))
}

const signIn=(event)=>{
  event.preventDefault();

  auth.signInWithEmailAndPassword(email,password)
  .catch((error)=>alert(error.message));
  
  setOpenSignIn(false);
}


  
  return (
    <div className="app">

      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
    <div style={modalStyle} className={classes.paper}>

      <form className="app__signup">
      <centre>
        <img
        className="app__headerImage"
        src=""
        alt="logo"/>
      </centre>
      <Input
          type='text'
          placeholder='username'
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          />
          <Input
          type='email'
          placeholder='email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <Input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <Button type="submit"   onClick={signUp}>Sign Up</Button>
          </form>
</div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
      >
    <div style={modalStyle} className={classes.paper}>

      <form className="app__signup">
      <centre>
        <img
        className="app__headerImage"
        src=""
        alt="logo"/>
      </centre>
          <Input
          type='email'
          placeholder='email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <Input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
          <Button type="submit"   onClick={signIn}>Sign In</Button>
          </form>
</div>
      </Modal>
      
      <div className="app__header">
      {/* <img 
      className="app__headerImage"
      src=""
      alt="instagram_logo"/> */}
      <img className="app__headerimage" alt="logo" src="https://raw.githubusercontent.com/vinteriland/instagram-clone/master/src/download.png"/>

            {user?(
        <Button onClick={()=>auth.signOut()}>SignOut</Button>
      ):
      (
        <div className="app__loginContainer">
      <Button onClick={()=>setOpenSignIn(true)}>SignIn</Button>
      <Button onClick={()=>setOpen(true)}>SignUp</Button>
      </div>
      )}
      </div>



      {
        posts.map(({id, post})=>(
          <Post key={id} 
          username={post.username} 
          caption={post.caption} 
          imageUrl={post.imageUrl}>

          </Post>
        ))
      }
      
{user?.displayName ? (
        <ImageUpload username={user.displayName}/>
      ):(
        <h3>Sorry You need to login to Upload</h3>
      )}
    </div>
  );
}

export default App;
