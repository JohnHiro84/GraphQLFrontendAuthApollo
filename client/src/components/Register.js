import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { REGISTER_USER } from "../graphql/mutations";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  // update the cache to let it know this user is loggedIn!
  updateCache(client, { data }) {
    client.writeData({
      data: { isLoggedIn: data.register.loggedIn }
    });
  }

  render() {
    return (
      <Mutation
        mutation={REGISTER_USER}
        onCompleted={data => {
          console.log(data);
          const { token } = data.register;
          localStorage.setItem("auth-token", token);
        }}
        update={(client, data) => this.updateCache(client, data)}
      >
        {registerUser => (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                registerUser({
                  variables: {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                  }
                });
              }}
            >
              <input
                value={this.state.name}
                onChange={this.update("name")}
                placeholder="Name"
              />
              <input
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />
              <input
                value={this.state.password}
                onChange={this.update("password")}
                type="password"
                placeholder="Password"
              />
              <button type="submit">Register</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default Register;


// import React from "react";
// import { Mutation } from "react-apollo";
// import gql from "graphql-tag";
//
// import {REGISTER_USER} from "../graphql/mutations";
// // const REGISTER_USER = Mutations;
//
// class Register extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       email: "",
//       password: ""
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   update(field) {
//     return e => this.setState({ [field]: e.target.value });
//   }
//
//   handleSubmit(e, registerUser) {
//     e.preventDefault();
//     registerUser({
//       variables: {
//         name: this.state.name,
//         email: this.state.email,
//         password: this.state.password
//
//       }
//     });
//   }
//
//   updateCache(client, { data }){
//     client.writeData({
//       data: { isLoggedIn: data.register.loggedIn }
//     });
//   }
//   render() {
//     return (
//       <Mutation
//         mutation={REGISTER_USER}
//         onCompleted={data => {
//           console.log(data)
//           const{ token } = data.register;
//           localStorage.setItem("auth-token", token);
//         }}
//         update={(client, data) => this.updateCache(client, data)}
//         >
//         {(registerUser) => (
//           <div>
//             <form onSubmit={e => this.handleSubmit(e, registerUser)}>
//             <input value={this.state.name} onChange={this.update("name")} placeholder="name"/>
//             <input value={this.state.email} onChange={this.update("email")} placeholder="email"/>
//             <input value={this.state.password} onChange={this.update("password")} placeholder="password"/>
//
//               <button type="submit">Register</button>
//             </form>
//           </div>
//         )}
//         </Mutation>
//     );
//   }
// }
//
// export default Register;
