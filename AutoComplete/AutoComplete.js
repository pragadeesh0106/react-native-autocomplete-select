import React, { Component } from 'react'
import { TouchableHighlight, Text, TextInput, View, ListView, ScrollView, TouchableOpacity } from 'react-native'
import stringScore from 'string_score'
// import Styles from './Styles'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, Button } from 'antd-mobile';
import FontAwesome, { Icons } from 'react-native-fontawesome';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class AutoComplete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: false,
    }
  }

  componentDidMount() {
    if (this.props && this.props.data.length > 0) {
      this.setState({
        initial: true,
        listData: ds.cloneWithRows(this.props.data),
        textValue: this.props.value ? this.props.data.filter(data => data.value === this.props.value)[0].text : ''
      })
    }
  }
  onSelect(value) {
    const textValue = this.props.data.filter(data => data.value === value)[0].text;
    this.setState({
      textValue: textValue
    })
  }
  renderList = () => {

    return (
      <View>
        <Card style={{
          position: 'absolute',
          width: '100%',
          top: 0,
          zIndex: 9
        }} >
          <Card.Body>
            <View>
              <View>
                <TextInput />
              </View>
              {this.state.listData ?
                <ListView
                  dataSource={this.state.listData}
                  onClick={(item) => this.onSelect.bind(this, item.value)}
                  renderRow={(rowData) =>
                    (<View
                      style={{
                        paddingTop: 5,
                        paddingBottom: 5,
                        paddingLeft: 15,
                        paddingRight: 15,
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1
                      }}>
                      <Text>
                        {rowData.text}
                      </Text>
                    </View>)}
                />
                : <View />}
            </View>
          </Card.Body>
        </Card>
      </View>
    )
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => {
          this.setState({
            list: this.state.list ? false : true
          })
        }}>
          <View style={{
            position: 'relative',
            flexDirection: 'row',
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
          }}>
            <View style={{ flex: 3 }}>
              <Text style={{ marginLeft: 5, padding: 5, paddingBottom: 0 }} >
                {this.state.textValue}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              {this.state.list ?
                <Text style={{ margin: 10, fontSize: 15, textAlign: 'right' }}>
                  <FontAwesome>{Icons.chevronUp}</FontAwesome>
                </Text>
                :
                <Text style={{ margin: 10, fontSize: 15, textAlign: 'right' }}>
                  <FontAwesome>{Icons.chevronDown}</FontAwesome>
                </Text>
              }
            </View>
          </View>
        </TouchableOpacity >
        {
          this.state.list ?
            this.renderList()
            : <View style={{
              position: 'absolute'
            }} />
        }
      </View>
    )
  }
}

export default AutoComplete
