import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currency = '₹ '


    //function for calulating Age of user(for showing in 'allAppointments' page)
    const calculateAge = (dob) => {
        const today = new Date()             //current date
        const birthDate = new Date(dob)      //date of birth (ie here we have initialised date with 'dob' of user)

        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }





    //Changing Date Format (ie from 21_7_2003 to 21 Jul 2003) to show in UI
    const months = ["" , "Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"] 
 
    const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')       //this will return array containing 3 elements in "String" form => day , month and year respectively (ie dateArray[0] => date (eg "21") , dateArray[1] => month (eg "7") , dateArray[2] => year (eg "2003") )
    return  dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]                    //Number() => used to convert string into a Number
    }





    const value = {
      calculateAge,
      slotDateFormat, 
      currency,
    }


    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider