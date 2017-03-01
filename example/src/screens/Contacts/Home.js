import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Image,
} from 'react-native';
import { connect } from 'react-redux';
import AtoZListView from 'react-native-atoz-listview';
import { contactFetch } from '../../actions';
import ContactStyles from '../../constants/ContactStyles';
import { Search } from '../../components';

function renderLeft(state, setParams) {
    const { editing } = state.params || false;
    return (
        <TouchableHighlight
            style={{
                paddingLeft: 10
            }}
            onPress={() => {
                state.params.handleEdit();
                setParams({
                    editing: !editing
                });
            }}
        >
            <Text>{editing ? 'Done' : 'Edit'}</Text>
        </TouchableHighlight>

    );
}

class Home extends Component {

    static navigationOptions = {
        title: 'Contacts',
        header: ({ state, setParams }) => ({
            left: renderLeft(state, setParams)
        }),
    }

    constructor(props) {
        super(props);
        this.props.navigation.setParams({
            editing: false,
            handleEdit: this.handleEdit.bind(this),
        });
        this.props.contactFetch();
    }

    handleEdit() {
        console.log(this);
    }

    renderSectionHeader = (sectionId, rowId) => {
        return (
            <View style={ContactStyles.sectionHeader}>
                <Text style={ContactStyles.sectionHeaderText}>{rowId}</Text>
            </View>
        );
    }

    renderRow = (item, sectionId, index) => {
        return (
            <TouchableHighlight
                underlayColor={ContactStyles.rowUnderlayColor}
            >
                <View style={ContactStyles.rowContainer}>
                    <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/med/men/40.jpg' }}
                        style={ContactStyles.avatar}
                    />
                    <View style={ContactStyles.rowTextContainer}>
                        <Text style={ContactStyles.rowText}>{item.name}</Text>
                        <Text style={ContactStyles.rowSubText}>{item.email}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    renderSeparator = (sectionId, rowId) => {
        return <View style={ContactStyles.rowSeparator} key={`${sectionId}${rowId}`} />;
    }

    renderHeader = () => {
        return (
            <View style={ContactStyles.headerContainer}>
                <Text style={ContactStyles.headerText}>My Number: +8498-280-8065</Text>
            </View>
        );
    }

    renderFooter = () => {
        return (
            <View style={ContactStyles.footerContainer}>
                <Text style={ContactStyles.footerText}>{this.props.count} Contacts</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Search
                    titleSearch="Tìm kiếm"
                    titleCancel="Huỷ"
                    onSearch={(text) => console.log('onSearch outside', text)}
                    onFocus={(text) => console.log('focused outside', text)}
                    onChangeText={(text) => console.log('onChangeText outside', text)}
                    onDelete={() => console.log('onDelete outside')}
                    onCancel={() => console.log('onCancel outside')}
                    style={{
                        backgroundColor: 'green'
                    }}
                />
                <AtoZListView
                    enableEmptySections
                    data={this.props.contacts}
                    renderRow={this.renderRow}
                    rowHeight={50}
                    renderSectionHeader={this.renderSectionHeader}
                    sectionHeaderHeight={40}
                    renderSeparator={this.renderSeparator}
                    renderHeader={this.renderHeader}
                    headerHeight={50}
                    renderFooter={this.renderFooter}
                    footerHeight={50}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({ contacts: state.contacts.data, count: state.contacts.count });
export default connect(mapStateToProps, { contactFetch })(Home);
