import React, { Component } from 'react'
import { UserCard } from './UserCard'

export class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userList: [],
            rolList: [],
            nombreRol: []
        }
    }

    componentDidMount = () => {
        fetch("http://localhost:3001/api/users")
            .then(response => response.json())
            .then(data => this.setState({ userList: data.lista }))
            .catch((e) => console.log(e))
    }


    render() {
        return (
            <div style={{ width: "80%", margin: "auto", color: "white", marginTop: "3%" }}>
                {this.state.userList.map((user) => {
                    return <UserCard id={user.id} nombre={user.nombre} email={user.email} rol={user.rolId} showHeader={user.id === 1} />
                })
                }
            </div>
        )
    }
}