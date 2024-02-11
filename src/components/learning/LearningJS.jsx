const person = {
    name: 'fatih',
    address: {
        city:'Istanbul',
        district:'Maltepe'

    },
    profile:['twitter','linkedin'],
    printProfile:() =>{
        person.profile.map(
            profile => {
                console.log(profile)
            }
        )
    }
}

//function printProfile(){
//    console.log(person.profile[1])
//}


export default function LearningJS(){
    return (
        <>
        <div>{person.name}</div>
        <div>{person.address.city}</div>
        <div>{person.address.district}</div>
        <div>{person.profile[0]}</div>
        <div>{person.printProfile()}</div>
        </>
    )
}