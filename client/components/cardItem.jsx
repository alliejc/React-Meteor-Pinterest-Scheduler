import React from 'react';
import Calendar from '/client/components/datepicker';
import TimePicker from '/client/components/timepicker';
import ChooseABoard from '/client/components/chooseaboard';
import {FlatButton, Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/';
import CardData from '/imports/collections/CardData';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment));

// Todo: Replace card image, title, and description with info from Pinterest card
//Todo: find out why metadata.name is not working

class CardItem extends React.Component {

    state = {

        //pin
        image_url: '',
        note: '',
        selectedBoardUrl: '',
        board: '',
        link: '',

        //time
        hours: 0,
        minutes: 0,
        ampm: '',
        time: 0,

        //date
        day: 0,
        month: 0,
        year: 0,
        date: 0,
    };

    setTime = (hours, minutes) => {

        if (hours < 12) {
            this.setState({ampm: "am"});
        } else {
            this.setState({ampm: "pm"});
        }

        this.setState({minutes: minutes});
        this.setState({hours: hours});

    };

    setDate = (day, month, year) => {
        this.setState({day: day});
        this.setState({month: month});
        this.setState({year: year});
    };


    setBoard = (selectedBoardUrl) => {

        if(selectedBoardUrl != null) {
            let boardSpec = '';
            let slashCounter = 0;

            for (let i = 0; i < selectedBoardUrl.length - 2; i++) {
                if (selectedBoardUrl[i] === '/') {
                    slashCounter++
                }
                if (slashCounter >= 3) {
                    boardSpec = boardSpec + selectedBoardUrl[i + 1];
                    this.setState({board: boardSpec});
                }
            }
            console.log("pin to boardspec" + boardSpec);

            this.setState({selectedBoardUrl: selectedBoardUrl});
            console.log(boardSpec);
        }
    };

    handleOnClickSubmit = () => {
        let cardInsertData = {};

        cardInsertData.destinationBoardTitle = this.state.selectedBoardUrl;
        cardInsertData.destinationBoardLink = this.state.selectedBoardUrl;
        cardInsertData.board = this.state.board;
        cardInsertData.note = this.props.pin.note;
        cardInsertData.image_url = this.props.pin.image.original.url;
        cardInsertData.link = this.props.pin.original_link;

        cardInsertData.day = this.state.day;
        cardInsertData.month = this.state.month;
        cardInsertData.year = this.state.year;

        cardInsertData.hours = this.state.hours;
        cardInsertData.minutes = this.state.minutes;
        cardInsertData.ampm = this.state.ampm;

        cardInsertData.userId = Meteor.userId();
        cardInsertData.momentDateTime = new Date(this.state.year, this.state.month - 1, this.state.day, this.state.hours, this.state.minutes);
        CardData.insert(cardInsertData);

    };


    render() {
        if (this.props.pin != null) {
            return (
                <div>
                    <div className="row">
                        <div className="row col s4 m3 l2">
                            <Card>
                                <CardMedia>
                                    <img src={this.props.pin.image.original.url}/>
                                </CardMedia>
                                <CardTitle title={this.props.pin.metadata.name} subtitle={this.props.pin.original_link}/>
                                <CardText> {this.props.pin.note} </CardText>
                                <CardActions>
                                    <ChooseABoard onChange={(selectedBoardUrl) => this.setBoard(selectedBoardUrl)}/>
                                    <TimePicker onChange={(hours, minutes) => this.setTime(hours, minutes)}/>
                                    <Calendar onChange={(day, month, year) => this.setDate(day, month, year)}
                                              day={this.state.date}/>
                                    <FlatButton label="Submit" primary={true}
                                                onClick={this.handleOnClickSubmit.bind(this)}/>
                                </CardActions>
                            </Card>
                        </div>
                    </div>
                </div>
            );
        } else return <div></div>
    }
}

export default CardItem;
