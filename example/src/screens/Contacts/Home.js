import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Image,
} from 'react-native';
import { connect } from 'react-redux';
import Search from 'react-native-search-box';
import AtoZListView from 'react-native-atoz-listview';
import { contactFetch } from '../../actions';
import ContactStyles from '../../constants/ContactStyles';

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
            left: renderLeft(state, setParams),
        }),
    }

    componentWillMount() {
        // this.props.navigation.setParams({
        //     editing: false,
        //     handleEdit: this.handleEdit.bind(this),
        // });
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
                onPress={() => this.refs.search_bar.focus(item.name)}
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

    beforeFocus = () => {
        return new Promise((resolve, reject) => {
            console.log('beforeFocus');
            resolve();
        });
    }

    onFocus = (text) => {
        return new Promise((resolve, reject) => {
            console.log('onFocus', text);
            resolve();
        });
    }

    afterFocus = () => {
        return new Promise((resolve, reject) => {
            console.log('afterFocus');
            resolve();
        });
    }

    onCancel = () => {
        return new Promise((resolve, reject) => {
            console.log('onCancel');
            resolve();
        });
    }

    afterDelete = () => {
        return new Promise((resolve, reject) => {
            console.log('afterDelete => toggle keyboard');
            this.refs.search_bar.focus();
            resolve();
        });
    }

    onSearch = (text) => {
        return new Promise((resolve, reject) => {
            console.log('onSearch', text);
            resolve();
        });
    }

    onChangeText = (text) => {
        return new Promise((resolve, reject) => {
            console.log('onChangeText', text);
            resolve();
        });
    }

    render() {
        return (
            <View
                style={{ flex: 1 }}
            >
                <Search
                    ref="search_bar"
                    titleSearch="Tìm kiếm"
                    titleCancel="Huỷ"
                    onSearch={this.onSearch}
                    onChangeText={this.onChangeText}
                    onDelete={() => console.log('onDelete')}
                    afterDelete={this.afterDelete}
                    beforeFocus={this.beforeFocus}
                    onFocus={this.onFocus}
                    afterFocus={this.afterFocus}
                    onCancel={this.onCancel}
                    backgroundColor="purple"
                    placeholderTextColor="#9a119a"
                    tintColorSearch="#9a119a"
                    tintColorDelete="#9a119a"
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
                    style={{
                        top: this.atoZAnimated
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({ contacts: state.contacts.data, count: state.contacts.count });
export default connect(mapStateToProps, { contactFetch })(Home);
