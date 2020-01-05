import React, { Component } from "react";
import "./card.css";

class card extends Component {
  state = {
    placeholderUserName: "Votre Nom",
    placeholderCardNumber: "**** **** **** ****",
    placeholderCardDate: "Date d'expiration",
    userName: "",
    cardNumber: "",
    cardDate: "",
    displayMessage: "Enter the user name",
    validUser: {
      status: true,
      message: ""
    },
    validNumber: {
      status: true,
      message: ""
    },
    validDate: {
      status: true,
      message: ""
    }
  };

  checkCard = event => {
    var regexCard = /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/;
    if (!regexCard.test(event.target.value)) {
      this.setState({
        validNumber: { status: false, message: "Card number not valid" }
      });
    } else if (event.target.value.length > 19) {
      this.setState({
        validUser: {
          status: false,
          message: "ne doit pas dépasser 16 chiffres"
        }
      });
    } else {
      this.setState({
        validNumber: { status: true, message: "" },
        [event.target.name]: event.target.value
      });
    }
  };

  checkDate = event => {
    let regexCard = /^[0-9]{2}\/[0-9]{2}$/;
    if (!regexCard.test(event.target.value)) {
      this.setState({
        validDate: { status: false, message: "Card date not valid" }
      });
    } else {
      this.setState({
        validDate: { status: true, message: "" },
        [event.target.name]: event.target.value
      });
    }
  };

  update = event => {
    switch (event.target.name) {
      case "userName":
        var regex = /[^A-Za-z ]/g;
        if (event.target.value.match(regex)) {
          this.setState({
            validUser: { status: false, message: "Tape only text" }
          });
        } else if (event.target.value.length > 20) {
          this.setState({
            validUser: { status: false, message: "doit être moins de 20" }
          });
        } else {
          this.setState({
            validUser: { status: true, message: "" },
            [event.target.name]: event.target.value
          });
        }
        break;
      case "cardNumber":
        event.target.value = event.target.value
          .replace(/[^\d]/g, "")
          .replace(/(.{4})/g, "$1 ")
          .trim();

        regex = /^[0-9 ]*$/;

        if (!regex.test(event.target.value)) {
          this.setState({
            validNumber: { status: false, message: "Card number not valid" }
          });
        } else if (event.target.value.length > 19) {
          this.setState({
            validUser: {
              status: false,
              message: "ne doit pas dépasser 16 chiffres"
            }
          });
        } else {
          this.setState({
            validNumber: { status: true, message: "" },
            [event.target.name]: event.target.value
          });
        }
        break;
      case "cardDate":
        let re = /^[0-9]*$/;
        if (
          re.test(event.target.value) &&
          event.target.value.slice(0, 2) < 13
        ) {
          this.setState({
            cardDate: event.target.value
              .replace(/[^\d]/g, "")
              .replace(/^(.{2})/g, "$1/")
              .trim()
          });
        } else {
          this.setState({
            validDate: { status: false, message: "card date not valid" }
          });
        }
        break;
    }
  };

  render() {
    return (
      <div className="displayCard">
        <div className="idCard">
          <div className="titleCard">
            <h1>Credit card</h1>
          </div>

          <h2 className="idCardNumber">{this.state.cardNumber}</h2>
          <img
            src="https://uploads.codesandbox.io/uploads/user/8f10ee4c-10fc-41b7-885a-4b795b293c1d/aFYl-visa.jpg"
            alt=""
          />
          <div className="userCard">
            <div className="userName">{this.state.userName.toUpperCase()}</div>

            <div className="userCardValidation">
              <span>{this.state.cardDate}</span>
            </div>
          </div>
        </div>

        {/* Remplissage des données */}
        <div className="bgCard">
          {!this.state.validNumber.status ? (
            <span style={{ color: "#ff0000" }}>
              {this.state.validNumber.message}
            </span>
          ) : null}
          <input
            className="styleInput"
            type="text"
            name="cardNumber"
            maxLength="19"
            placeholder={this.state.placeholderCardNumber}
            onChange={this.update}
            onBlur={this.checkCard}
          />{" "}
          {!this.state.validUser.status ? (
            <span style={{ color: "#ff0000" }}>
              {this.state.validUser.message}
            </span>
          ) : null}
          <input
            className="styleInput"
            type="text"
            name="userName"
            placeholder={this.state.placeholderUserName}
            onChange={this.update}
          />
          {!this.state.validDate.status ? (
            <span style={{ color: "#ff0000" }}>
              {this.state.validDate.message}
            </span>
          ) : null}
          <input
            className="styleInput"
            type="text"
            name="cardDate"
            maxLength="4"
            placeholder={this.state.placeholderCardDate}
            onChange={this.update}
            onBlur={this.checkDate}
          />
        </div>
      </div>
    );
  }
}
export default card;
