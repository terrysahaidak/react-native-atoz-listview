import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    TextInput,
    Animated,
    Dimensions,
    Easing
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Search extends Component {
    static propTypes = {
        text: PropTypes.string,
        style: PropTypes.object,
    }

    constructor(props) {
        super(props);

        this.state = {
            focused: false,
            focusAnimatedValue: new Animated.Value(middleWidth - 20),
            cancelAnimatedValue: new Animated.Value(0),
            keyword: ''
        };
        this.onChangeText = this.onChangeText.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onChangeText = (text) => {
        let showDeleteIcon = 0;
        if (text.length > 0) {
            showDeleteIcon = 1;
        }
        Animated.timing(
            this.state.cancelAnimatedValue,
            {
                toValue: showDeleteIcon,
                duration: 200
            }
        ).start();
        this.setState({
            keyword: text
        });
        console.log('onChangeText', this.state.keyword);
    }

    onFocus = () => {
        Animated.timing(
            this.state.focusAnimatedValue,
            {
                toValue: 20,
                duration: 200
            }
        ).start();
    }

    onCancel = () => {
        this.setState({
            keyword: ''
        });
        Animated.parallel([
            Animated.timing(
                this.state.cancelAnimatedValue,
                {
                    toValue: 0,
                    duration: 200
                }
            ).start(),
            Animated.timing(
                this.state.focusAnimatedValue,
                {
                    toValue: 0,
                    duration: 200
                }
            ).start(),
        ]);
    }

    render() {
        return (
            <View ref="searchContainer" style={styles.container}>
                <TextInput
                    style={[
                        styles.input
                    ]}
                    value={this.state.keyword}
                    onChangeText={this.onChangeText}
                    placeholder={this.props.text || 'Search'}
                    onFocus={this.onFocus}
                />
                <TouchableWithoutFeedback
                    onPress={this.onCancel}
                >
                    <Animated.View
                        style={[
                            styles.cancelContainer,
                            {
                                opacity: this.state.cancelAnimatedValue
                            }
                        ]}
                    >
                        <Icon
                            name="ios-close-circle"
                            color="grey"
                            size={20}
                        />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <View>
                        <Icon
                            name="ios-search-outline"
                            style={styles.labelIconStyle}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View >
        );
    }
}

const {width: contentWidth } = Dimensions.get('window');
const containerHeight = 60;
const middleHeight = 30;
const middleWidth = contentWidth / 2;

const styles = {
    container: {
        backgroundColor: 'grey',
        height: containerHeight,
        flexDirection: 'row'
    },
    labelContainer: {
        backgroundColor: '#ddd',
        width: contentWidth,
        height: containerHeight,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelIconStyle: {
        color: '#000',
        paddingRight: 2,
        fontSize: 12
    },
    cancelContainer: {
        height: containerHeight,
        backgroundColor: 'transparent',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: 20
    },
    labelTextStyle: {
        color: '#000',
        fontSize: 12
    },
    input: {
        position: 'absolute',
        height: 40,
        width: contentWidth - 20,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: middleWidth - 20,
        paddingRight: 10,
        borderColor: '#000',
        backgroundColor: '#f7f7f7',
        borderRadius: 5,
    }
};

export { Search };
