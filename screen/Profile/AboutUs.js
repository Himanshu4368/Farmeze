import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AboutUs = ({ navigation }) => {
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const [showTermsConditions, setShowTermsConditions] = useState(false);

    const privacyPolicyHeight = new Animated.Value(0);
    const termsConditionsHeight = new Animated.Value(0);

    const togglePrivacyPolicy = () => {
        setShowPrivacyPolicy(!showPrivacyPolicy);
        Animated.timing(privacyPolicyHeight, {
            toValue: showPrivacyPolicy ? 0 : 100,  // Adjust the height based on content
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const toggleTermsConditions = () => {
        setShowTermsConditions(!showTermsConditions);
        Animated.timing(termsConditionsHeight, {
            toValue: showTermsConditions ? 0 : 100,  // Adjust the height based on content
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={25} color="green" />
                </TouchableOpacity>
                {/* <Text style={styles.headerText}>Account</Text> */}
            </View>
            <Text style={styles.title}>About Us</Text>
            <Text style={styles.paragraph}>
                Welcome to <Text style={styles.bold}>Farmeze</Text>, your trusted platform for direct farm-to-consumer vegetable supply.
                We are committed to bridging the gap between local farmers and consumers, offering fresh, high-quality produce at affordable prices.
            </Text>
            <Text style={styles.paragraph}>
                Our mission is to promote sustainable farming while providing a seamless experience for consumers to access fresh, locally grown vegetables.
                With the power of technology, we aim to simplify the supply chain and make it easier for everyone to eat healthy.
            </Text>

            <Text style={styles.subheading}>Our Values</Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Freshness:</Text> We ensure the highest quality and freshness of all our produce.
            </Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Sustainability:</Text> We actively support eco-friendly farming practices to reduce our environmental impact.
            </Text>
            <Text style={styles.paragraph}>
                <Text style={styles.bold}>Community:</Text> We believe in nurturing strong relationships between farmers and consumers, fostering mutual trust.
            </Text>

            <Text style={styles.subheading}>Meet the Team</Text>
            <Text style={styles.paragraph}>
                Our team consists of passionate professionals dedicated to improving the food supply chain and empowering local farmers.
                From tech innovators to agricultural experts, we are all united by the common goal of transforming the way food reaches your table.
            </Text>

            {/* Privacy Policy Section */}
            <TouchableOpacity onPress={togglePrivacyPolicy}>
                <Text style={styles.collapsibleTitle}>Privacy Policy</Text>
            </TouchableOpacity>
            <Animated.View style={{ height: privacyPolicyHeight, overflow: 'hidden' }}>
                <Text style={styles.collapsibleContent}>
                    Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
                    We are committed to safeguarding your privacy and ensuring your information is handled securely.
                </Text>
            </Animated.View>

            {/* Terms and Conditions Section */}
            <TouchableOpacity onPress={toggleTermsConditions}>
                <Text style={styles.collapsibleTitle}>Terms and Conditions</Text>
            </TouchableOpacity>
            <Animated.View style={{ height: termsConditionsHeight, overflow: 'hidden' }}>
                <Text style={styles.collapsibleContent}>
                    By using our platform, you agree to our terms and conditions. This includes guidelines on usage, restrictions,
                    and the responsibilities of both consumers and farmers to ensure a smooth experience.
                </Text>
            </Animated.View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F3FAF1',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1F7A35',
        textAlign: 'center',
        marginBottom: 20,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 15,
        textAlign: 'justify',
        color: '#344054',
    },
    bold: {
        fontWeight: 'bold',
        color: '#1F7A35',
    },
    subheading: {
        fontSize: 22,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 10,
        color: '#1F7A35',
    },
    collapsibleTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F7A35',
        marginTop: 20,
        paddingVertical: 10,
    },
    collapsibleContent: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 15,
        color: '#344054',
    },
});

export default AboutUs;
