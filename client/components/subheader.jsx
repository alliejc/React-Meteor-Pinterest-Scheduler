import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle, TextField, Drawer, AppBar, RaisedButton, IconButton} from 'material-ui';
import ChooseABoard from '/client/components/chooseaboard';
import Schedule from './schedule';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Content from '/client/components/content';

// Todo: dynamically fill options with user pinterest boards
//Source of Truth for isOpen

class SubHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            selectedBoardId: '',
            open: true,
            pinObjects: []
        };
    }

    getBoardPins = (selectedBoardId) => {
        this.setState({selectedBoardId: selectedBoardId});
        console.log(selectedBoardId);

        let boardSpec = '';
        let slashCounter = 0;

        for(let i = 0; i < selectedBoardId.length; i++){
            if(selectedBoardId[i] === '/'){
                slashCounter++
            }
            if(slashCounter >= 3){
                boardSpec = boardSpec + selectedBoardId[i];
        }
    }

        Meteor.call('getBoardPins', boardSpec, (err, result) => {
            this.setState({pinObjects: result});

            console.log("err " + err);
            console.log("will mount " + result);
        })

    };


    handleToggle = () => {
        this.setState({open: !this.state.open});

        if (this.props.onChange) {
            this.props.onChange({open: !this.state.open});
        }
        console.log(this.state.open);
    };

    render(){
        return(
            <div>
            <Toolbar>
                <ToolbarGroup className="container">
                    <ToolbarTitle text="Board Title"/>
                    <ChooseABoard onChange={(selectedBoardId) => this.getBoardPins(selectedBoardId)}/>
                    <TextField hintText="Enter URL"/>
                    <RaisedButton label="See Schedule" onTouchTap={this.handleToggle}/>
                </ToolbarGroup>
            </Toolbar>
                <Drawer
                    width={700}
                    openSecondary={true}
                    open={this.state.open}>
                    <AppBar title="AppBar"
                            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                            onTouchTap={this.handleToggle}
                    />
                    <Schedule />
                </Drawer>
                <Content pinObjects={this.state.pinObjects} />
            </div>

        );
    }
}
export default SubHeader;