//Credentials :- 

// User => email :- naman@gmail.com , passsword :- 21072003       
//         email :- damita@gmail.com , password :- 12345678

// Admin =>  email :- admin@medicare.com , password :- admin123

// Doctor => email :- naman@medicare.com , password :- naman123
//           email :- damita@medicare.com , password :- damita123


//Dummy Card :- 4386 2894 0766 0153








//how props and params work :-

//file 1 :-    
//  const {docId} = useParams()    //we take out docId from route(ie current link) 
//  <file2 test={docId} />         //we have send 'docId' in props, while rendering/calling component 'file2' in 'file1'

//file2 :-
// const file2 ({docId}) => {       //here we are using docId sent from 'file1' 
//   // code    
//    }