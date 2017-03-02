import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Image,
    Button,
    Animated
} from 'react-native';
import { connect } from 'react-redux';
import Search from 'react-native-search-box';
import AtoZListView from 'react-native-atoz-listview';
import { contactFetch } from '../../actions';
import ContactStyles from '../../constants/ContactStyles';

const AnimatedAtoZListView = Animated.createAnimatedComponent(AtoZListView);
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

    constructor(props) {
        super(props);
        this.props.navigation.setParams({
            editing: false,
            handleEdit: this.handleEdit.bind(this),
        });
        this.atoZAnimated = new Animated.Value(0);
    }

    async componentWillMount() {
        await this.props.contactFetch();
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

    beforeFocus = () => {
        return new Promise((resolve, reject) => {
            Animated.timing(
                this.atoZAnimated,
                {
                    toValue: -38,
                    duration: 300
                }
            ).start(() => {
                console.log('Animation completed');
                resolve(true);
            });
        });
    }

    afterFocus = () => {
        return new Promise((resolve, reject) => {
            console.log('afterFocus');
            resolve(true);
        });
    }

    onSearchCancel = () => {
        Animated.timing(
            this.atoZAnimated,
            {
                toValue: 0,
                duration: 200
            }
        ).start();
    }

    onSearchPressed = (text) => {
        Animated.timing(
            this.atoZAnimated,
            {
                toValue: 0,
                duration: 200
            }
        ).start();
        console.log('onSearchPressed', text);
    }

    onChangeText = (text) => {
        console.log('onSearchChange', text);
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
                    onSearch={this.onSearchPressed}
                    onChangeText={this.onChangeText}
                    onDelete={() => console.log('onDelete')}
                    beforeFocus={this.beforeFocus}
                    afterFocus={this.afterFocus}
                    onCancel={this.onSearchCancel}
                />
                <Button title="Focus and set default keyword" onPress={() => this.refs.search_bar.focus('New keyword')} />
                <AnimatedAtoZListView
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
