import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {StyleSheet, View, TouchableOpacity, TextInput} from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text ,Row} from 'native-base';
import { connect } from 'react-redux';

const submit = values => {
    console.log(values);
    alert(`Validation success. Values = ~${JSON.stringify(values)}`);
};

const validate = values => {
    const error= {};
    error.email= '';
    error.name= '';
    var ema = values.email;
    var nm = values.name;
    if(values.email === undefined){
        ema = '';
    }
    if(values.name === undefined){
        nm = '';
    }
    if(ema.length < 8 && ema !== ''){
        error.email= 'too short';
    }
    if(!ema.includes('@') && ema !== ''){
        error.email= '@ not included';
    }

    if(nm.length > 8){
        error.name= 'max 8 characters';
    }
    return error;
};

class Test extends Component {

    constructor(props){
        super(props);

        this.renderInput = this.renderInput.bind(this);
    }

    renderInput({ input, label, type, meta: { touched, error, warning } }){
        //   console.log(input);
        let hasError= false;
        if(error !== undefined){
            hasError= true;
        }
        return( <View style= {{ flex:1}} error= {hasError}>
            <Input returnKeyType="next" style={{borderWidth:1 , borderRadius:4,height:40}}  {...input}/>
            {hasError ? <Text>{error}</Text> : <Text />}
        </View> )
    }


    render() {
        const { handleSubmit, reset } = this.props;
        return (
            <Container style= {{ backgroundColor: "#eafcf9"}}>
                <Header>
                    <Body>
                    <Title>Redux Form</Title>
                    </Body>
                </Header>
                <Content padder contentContainerStyle={{}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{flex:0.5, fontWeight: 'bold',marginBottom:8}}>Email</Text>
                        <Field name="email" input={{keyboardType:"email-address"}} style={{}} component={this.renderInput} />
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{flex:0.5, fontWeight: 'bold',marginBottom:8}}>Password</Text>
                        <Field name="password" input={{keyboardType:"default",secureTextEntry:true}} style={{}} component={this.renderInput} />
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{flex:0.5, fontWeight: 'bold',marginBottom:8}}>Address</Text>
                        <Field name="address" input={{keyboardType:"default"}} style={{}} component={this.renderInput} />
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{flex:0.5, fontWeight: 'bold',marginBottom:8}}>Age</Text>
                        <Field name="age" input={{keyboardType:"numeric"}} style={{}} component={this.renderInput} />
                    </View>

                    <Button style= {{ margin: 10 }} block primary onPress= {handleSubmit(submit)}>
                        <Text>Submit</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.form);
    return state;
};

const mapDispatchToProps = (dispatch)  => ({
    // ...
});

Test = connect(
    mapStateToProps,
    mapDispatchToProps
)(Test);


const TestForm = reduxForm({
    form: 'contact', // a unique identifier for this form
    // validate,                // <--- validation function given to redux-form
})(Test);

export default TestForm;
