import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Container, Item, Input, Picker, Body, Content, Title, Button, Row } from 'native-base';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, DatePickerIOS, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Calendar,CalendarList } from 'react-native-calendars';

//Validation
const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length > 20) {
        errors.username = 'username must be less than or equal 20 characters'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.age) {
        errors.age = 'Required'
    } else if (isNaN(Number(values.age))) {
        errors.age = 'Age must be a number'
    } else if (Number(values.age) < 18) {
        errors.age = 'You must be at least 18 years old'
    }
    return errors
};
const warn = values => {
    const warnings = {};
    if (values.age < 19) {
        warnings.age = 'You seem a bit young...'
    }
    return warnings
};
const renderField = ({ label, keyboardType, returnKeyType, meta: { touched, error, warning }, input: { onChange, ...restInput } }) => {
    return (
        <View style={{ flexDirection: 'column', height: 70, alignItems: 'flex-start' }}>
            <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', width: 80 }}>{label}</Text>
                <TextInput style={{ borderColor: 'steelblue', borderWidth: 1, height: 37, width: 220, padding: 5 }}
                    keyboardType={keyboardType} returnKeyType={returnKeyType}
                    onChangeText={onChange} {...restInput}
                >
                </TextInput>
            </View>
            {touched && ((error && <Text style={{ color: 'red' }}>{error}</Text>) ||
                (warning && <Text style={{ color: 'orange' }}>{warning}</Text>))}
        </View>
    );
};

const renderPicker = ({ label, input: { onChange, value, ...inputProps }, children, ...pickerProps }) => (
    <View style={{ flexDirection: 'column', height: 70, alignItems: 'flex-start' }}>
        <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold', width: 80 }}>{label}</Text>
            <View style={{ borderColor: 'steelblue', borderWidth: 1, height: 37, width: 220, padding: 5, justifyContent: 'center' }}>
                <Picker
                    supportedOrientations={['portrait', 'landscape']}

                    selectedValue={value}
                    onValueChange={value => onChange(value)}
                    {...inputProps}
                    {...pickerProps}
                >
                    {children}
                </Picker>
            </View>
        </View>
    </View>
);

const renderDateField = ({ input: { onChange, value, ...restInput }, label, meta: { touched, error }, ...custom }) => {
    return (
        <View>
            {/* <FormLabel>{label}</FormLabel> */}
            <DatePicker
                style={{ width: 200 }}
                date={value}
                mode='date'
                placeholder="Select Date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 120,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 56
                    }
                }}
                onDateChange={onChange}
            />
            {touched && (error && <FormValidationMessage>{error}</FormValidationMessage>)}
        </View>
    )
}


const submit = values => {
    console.log(`Validation success. Values = ~${JSON.stringify(values)}`);
};

const ContactForm = props => {
    const { handleSubmit } = props;
    return (
        <ScrollView contentContainerStyle={{ flexDirection: 'column', margin: 40, justifyContent: 'flex-start', }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', width: 200, textAlign: 'center', margin: 10 }}>Redux-form example</Text>
            <Field name="username" returnKeyType="next" keyboardType="default" label="Username: "
                component={renderField} />
            <Field name="email" keyboardType="email-address" label="Email: " component={renderField} />
            <Field name="age" keyboardType="numeric" label="Age: " component={renderField} />
            <Field
                label="Expire date"
                name="ExpireDate"
                component={renderPicker}
                //  iosHeader="Select one"
                mode="dialog"
            //     format={ formatLoanTerm }
            //     parse={ parseLoanTerm }
            >
                <Item label="30 Years" value="30" />
                <Item label="20 Years" value="20" />
                <Item label="10 Years" value="10" />
                <Item label="7 Years" value="7" />
            </Field>

            <Field name="date" label="Date" component={renderDateField} />
        
            <TouchableOpacity onPress={handleSubmit(submit)} style={{ margin: 10, alignItems: 'center' }}>
                <Text style={{
                    backgroundColor: 'steelblue', color: 'white', fontSize: 16,
                    height: 37, width: 200, textAlign: 'center', padding: 10
                }}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const mapStateToProps = (state) => {
    // console.log(state.form.contact.values);
    return state;
};

const mapDispatchToProps = (dispatch) => ({
    // ...
});

ContactForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactForm);

export default reduxForm({
    form: 'contact', // a unique identifier for this form
     validate,                // <--- validation function given to redux-form
})(ContactForm);

