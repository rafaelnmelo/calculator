import React from "react";
import {
    StyleSheet,
    Text,
    SafeAreaView
} from "react-native";

const styles = StyleSheet.create({
    displayValue: {
        fontSize: 40,
        color: '#fff'
    },
    display: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'flex-end'
    }
})

export default props => {
    return (
        <SafeAreaView style={styles.display}>
            <Text style={styles.displayValue}>
                {props.value}
            </Text>
        </SafeAreaView>
    )
}