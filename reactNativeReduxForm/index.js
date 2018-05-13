import React, { Component } from 'react';
import { AppRegistry, View, Text } from 'react-native';
import { Provider } from "react-redux";
// import App from './App';
import store from "./store";
import ContactForm from './components/ContactForm';
import Test from './components/Test';

// const handleSubmit = values => {
//     alert(`submitting form with values = ${values}`);
// };

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ContactForm />
            </Provider>
        );
    }
};
AppRegistry.registerComponent('reactNativeReduxForm', () => App);