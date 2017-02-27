import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import AtoZListView from 'react-native-atoz-listview';
import { contactFetch } from '../../actions';
import ContactStyles from '../../constants/ContactStyles';
import { Search } from '../../components';

class Home extends Component {

    static navigationOptions = {
        title: 'Contacts',
    }

    componentWillMount() {
        this.props.contactFetch();
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
                <Search />
                <AtoZListView
                    enableEmptySections
                    data={this.props.contacts}
                    renderRow={this.renderRow}
                    rowHeight={50}
                    renderSectionHeader={this.renderSectionHeader}
                    sectionHeaderHeight={40}
                    renderSeparator={this.renderSeparator}
                    renderFooter={this.renderFooter}
                    footerHeight={50}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({ contacts: state.contacts.data, count: state.contacts.count });
export default connect(mapStateToProps, { contactFetch })(Home);
