import React, { ReactNode } from 'react'
import { Button, Switch, TextInput, View } from 'react-native'
import { AppLoading, Updates } from 'expo'
import { createStorageSlot } from 'StorageSlot'

interface FormState {
  input: string
  toggle: boolean
}

const EmptyFormState: FormState = {
  input: '',
  toggle: false,
}

const FormStateStorage = createStorageSlot<FormState>('form')

interface ExampleState {
  isLoadingComplete: boolean
  form: FormState
}

const Container = ({ children }: { children: ReactNode }) => (
  <View style={{ margin: 20, padding: 10, borderWidth: 1, borderColor: 'black', alignItems: "center" }}>
    {children}
  </View>
)

export default class Example extends React.Component<{}, ExampleState> {
  state = {
    isLoadingComplete: false,
    form: EmptyFormState,
  }

  restoreForm = async () => {
    const form = await FormStateStorage.get()
    this.setState({ form: form || EmptyFormState })
  }

  updateForm = (form: FormState) => {
    this.setState({ form })
    FormStateStorage.set(form).catch(e => console.error(e))
  }

  render() {
    const { isLoadingComplete, form } = this.state
    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this.restoreForm}
          onError={(e: Error) => console.error(e)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      )
    }
    return (
      <View style={{ flex: 1, justifyContent: 'space-around', padding: 10 }}>
        <Button title={'Reload app'} onPress={() => Updates.reload()} />
        <Button title={'Clear and reload app'} onPress={async () => {
          await FormStateStorage.del();
          Updates.reload()
        }} />
        <Container>
          <TextInput
            value={form.input}
            onChangeText={input => this.updateForm({ ...form, input })}
            placeholder="text input"
          />
        </Container>
        <Container>
          <Switch
            value={form.toggle}
            onValueChange={toggle => this.updateForm({ ...form, toggle })}
          />
        </Container>
      </View>
    )
  }
}
