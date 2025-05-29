import React, { useState, type FormEvent } from "react";
import { useUserStore } from "../../Stores/user.store";




const UserLIst = () => {
    const {user, addUser, deleteUser} = useUserStore()

    const [firstname, setFirstname] = useState<string>()
    const [lastname, setLastname] = useState<string>()
    const [inputAge, setInputAge] = useState<number>(0)
    const [inputHobbies, setInputHobbies] = useState<string[]>([])


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        addUser({
            firstName: firstname,
            lastName: lastname,
            age: inputAge,
            hobbies:  inputHobbies
        })
        
    }

    const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = event.target

        if(checked) {
            setInputHobbies((prev) => [...prev, value])
        } else {
            setInputHobbies((prev) => prev.filter((hobby) => hobby !== value))
        }
    }


    return (

        <div>
  <h1>User Information</h1>
  <ul>
    {user.map(user => (
      <li key={user.id}>
        <span>
          {user.firstName} {user.lastName} - {user.age} years old - Hobbies:
          {user.hobbies.map((hobby, index) => (
            <p key={index}>{hobby}</p>
          ))}
        </span>
        <button onClick={() => deleteUser(user.id)}>Delete User</button>
      </li>
    ))}
  </ul>

  <form
    onSubmit={handleSubmit}style={{display: "flex",flexDirection: "column",padding: "10px" }}>

    <input type="text" placeholder="Enter First name..." value={firstname}onChange={e => setFirstname(e.target.value)}/>

    <input type="text" placeholder="Enter Last name..." value={lastname} onChange={e => setLastname(e.target.value)}/>



    <input
      type="number"
      value={inputAge}
      onChange={e => setInputAge(Number(e.target.value))}
    />


    <div>
      <h4>Hobbies:</h4>

      <input  type="checkbox"  name="BasketBall" value="BasketBall" onChange={handleCheckBox}
      />
      <label htmlFor="BasketBall">BasketBall</label>

      <input type="checkbox" name="Volley" value="Volley" onChange={handleCheckBox}
      />
      <label htmlFor="Volley">Volley</label>

      <label htmlFor="Soccar">
        <input
          type="checkbox"
          name="Soccar"
          value="Soccar"
          onChange={handleCheckBox}
        />
        Soccar
      </label>
    </div>

    <button type="submit">Add user</button>
  </form>
</div>

    )





}

export default UserLIst