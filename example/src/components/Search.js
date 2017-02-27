import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    TextInput,
    Animated,
    Dimensions,
    Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width: contentWidth } = Dimensions.get('window');
const containerHeight = 40;
const middleHeight = 20;
const middleWidth = contentWidth / 2;
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class Search extends Component {
    static propTypes = {
        titleSearch: PropTypes.string,
        titleCancel: PropTypes.string,
        onFocus: PropTypes.func,
        onSearch: PropTypes.func,
        onChangeText: PropTypes.func,
        onCancel: PropTypes.func,
        onDeleteText: PropTypes.func,
        style: PropTypes.object,
    }

    constructor(props) {
        super(props);

        this.state = {
            iconSearchAnimated: new Animated.Value(middleWidth - 25),
            iconDeleteAnimated: new Animated.Value(0),
            inputFocusWidthAnimated: new Animated.Value(contentWidth - 10),
            inputFocusPlaceholderAnimated: new Animated.Value(middleWidth - 15),
            cancelAnimated: new Animated.Value(0),
            keyword: ''
        };
        this.onFocus = this.onFocus.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onDeleteText = this.onDeleteText.bind(this);
    }

    onSearch = () => {
        console.log('onSearch', this.state.keyword);
    }

    onChangeText = (text) => {
        console.log(text);
        Animated.timing(
            this.state.iconDeleteAnimated,
            {
                toValue: (text.length > 0) ? 1 : 0,
                duration: 200
            }
        ).start();
        this.setState({ keyword: text });
    }

    onFocus = () => {
        Animated.parallel([
            Animated.timing(
                this.state.inputFocusWidthAnimated,
                {
                    toValue: contentWidth - 70,
                    duration: 200
                }
            ).start(),
            Animated.timing(
                this.state.inputFocusPlaceholderAnimated,
                {
                    toValue: 20,
                    duration: 200
                }
            ).start(),
            Animated.timing(
                this.state.iconSearchAnimated,
                {
                    toValue: 10,
                    duration: 200
                }
            ).start(),
        ]);
    }

    onDeleteText = () => {
        Animated.timing(
            this.state.iconDeleteAnimated,
            {
                toValue: 0,
                duration: 200
            }
        ).start();
        this.setState({ keyword: '' });
    }

    onCancel = () => {
        this.setState({ keyword: '' });
        Keyboard.dismiss();
        Animated.parallel([
            Animated.timing(
                this.state.inputFocusWidthAnimated,
                {
                    toValue: contentWidth - 10,
                    duration: 200
                }
            ).start(),
            Animated.timing(
                this.state.inputFocusPlaceholderAnimated,
                {
                    toValue: middleWidth - 15,
                    duration: 200
                }
            ).start(),
            Animated.timing(
                this.state.iconSearchAnimated,
                {
                    toValue: middleWidth - 25,
                    duration: 200
                }
            ).start(),
            Animated.timing(
                this.state.iconDeleteAnimated,
                {
                    toValue: 0,
                    duration: 200
                }
            ).start(),
        ]);
    }

    onKeyPress = (key) => {
        if (key === 'Search') {
            Keyboard.dismiss();
        }
    }

    render() {
        return (
            <Animated.View
                ref="searchContainer"
                style={styles.container}
            >
                <AnimatedTextInput
                    style={[
                        styles.input,
                        {
                            width: this.state.inputFocusWidthAnimated,
                            paddingLeft: this.state.inputFocusPlaceholderAnimated
                        }
                    ]}
                    value={this.state.keyword}
                    onChangeText={this.onChangeText}
                    placeholder={this.props.titleSearch || 'Search'}
                    onFocus={this.onFocus}
                    onKeyPress={this.onKeyPress}
                    onSubmitEditing={this.onSearch}
                    autoCorrect={false}
                    returnKeyType="search"
                />
                <AnimatedIcon
                    name="ios-search-outline"
                    style={[
                        styles.iconSearch,
                        {
                            left: this.state.iconSearchAnimated
                        }
                    ]}
                />
                <TouchableWithoutFeedback onPress={this.onDeleteText}>
                    <AnimatedIcon
                        name="ios-close-circle"
                        style={[
                            styles.iconDelete,
                            { opacity: this.state.iconDeleteAnimated }
                        ]}
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.onCancel}>
                    <Animated.View style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>{this.props.titleCancel || 'Cancel'}</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Animated.View >
        );
    }
}

const styles = {
    container: {
        backgroundColor: 'grey',
        height: containerHeight,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 5,
        overflow: 'hidden'
    },
    input: {
        height: containerHeight - 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
        borderColor: '#000',
        backgroundColor: '#f7f7f7',
        borderRadius: 5,
        color: 'grey',
        fontSize: 13
    },
    iconSearch: {
        position: 'absolute',
        fontSize: 14,
        top: middleHeight - 7,
        backgroundColor: 'transparent',
        color: 'grey'
    },
    iconDelete: {
        position: 'absolute',
        right: 70,
        fontSize: 14,
        top: middleHeight - 7,
        backgroundColor: 'transparent',
        color: 'grey',
    },
    cancelButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        backgroundColor: 'transparent'
    },
    cancelButtonText: {
        fontSize: 14,
        color: '#0173fa'
    }
};

export { Search };
