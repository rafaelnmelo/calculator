import React, { Component } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import Button from './src/components/Button'
import Display from './src/components/Display'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
}

export default class App extends Component {
  state = { ...initialState }

  addDigit = digitTyped => {
    //limpa o display se o valor no display for zero 
    //ou a propriedade clearDisplay for true
    //antes de adicionar novo digito
    const clearDisplay = this.state.displayValue === '0'
      || this.state.clearDisplay

    //se já possuir ponto não inclui nada
    if (digitTyped === '.' && !clearDisplay
      && this.state.displayValue.includes('.')) {
      return
    }


    //pega o valor atual no display caso não tenha que limpar
    const currentValue = clearDisplay ? '' : this.state.displayValue
    //concatena o valor digitado com o valor atual
    const displayValue = currentValue + digitTyped
    //atualiza o estado
    this.setState({ displayValue, clearDisplay: false })
    //setar novo valor
    if (digitTyped !== ".") {
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.current] = newValue
      this.setState({ values })
    }
  }

  clearMemory = () => {
    this.setState({ ...initialState })
  }

  setOperation = operation => {
    //setar a operação mudando o estado atual para 1
    // e marcando o display para ser limpo na proxima digitação
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true })
    } else {
      //setar o resultado no indice 0 caso seja uma operação valida
      const equals = operation === '='
      const values = [...this.state.values]
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      } catch (error) {
        values[0] = this.state.values[0]
      }
      //atualizar todo o estado após a operação
      values[1] = 0
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values: values
      })
    }
  }

  render() {
    return (
      < SafeAreaView style={styles.container}>
        <Display value={this.state.displayValue} />
        <SafeAreaView style={styles.buttons}>
          <Button label='AC' triple onClick={this.clearMemory} />
          <Button label='/' operation onClick={this.setOperation} />
          <Button label='7' onClick={this.addDigit} />
          <Button label='8' onClick={this.addDigit} />
          <Button label='9' onClick={this.addDigit} />
          <Button label='*' operation onClick={this.setOperation} />
          <Button label='4' onClick={this.addDigit} />
          <Button label='5' onClick={this.addDigit} />
          <Button label='6' onClick={this.addDigit} />
          <Button label='-' operation onClick={this.setOperation} />
          <Button label='1' onClick={this.addDigit} />
          <Button label='2' onClick={this.addDigit} />
          <Button label='3' onClick={this.addDigit} />
          <Button label='+' operation onClick={this.setOperation} />
          <Button label='0' double onClick={this.addDigit} />
          <Button label='.' onClick={this.addDigit} />
          <Button label='=' operation onClick={this.setOperation} />
        </SafeAreaView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})
