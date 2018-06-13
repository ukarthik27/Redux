import React from 'react';
import ReactDOM from "react-dom";
import { AddItem } from "../actions/index"
import { removeItem } from "../actions/remove_action"
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { completeItem } from '../actions/completed_action';
import { editItem } from "../actions/edit_item";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { val: "", complete: false }
    }
    inputHandler = (event) => {
        var x = event.target.value;
        this.setState({ val: x });
    }
    keyHandler = (event) => {
        if (event.keyCode == 13) {
            if (this.state.val.trim().length != 0) {
                console.log("13");
                this.props.addItem(this.state.val);
                this.setState({ val: " " });
                var x = document.getElementById("item");
                x.value = "";
            }

        }
    }
    doneHandler = (obj) => {
        this.props.markCompleted(obj.item_name);


    }
    editHandler = (obj) => {
        var y = document.getElementById(obj.item_name);
        var x = y.childNodes[1];
        x.contentEditable = "true";
        x.setCursorPosition = 0;
        x.style.outline = "none";

        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(y.childNodes[1], 1);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);

        x.addEventListener("keydown", (event) => {
            if (event.keyCode == 13) {

                x.contentEditable = "false";

                console.log(obj.item_name, x.innerText);
                this.props.edit(obj.item_name, x.innerText, obj.isCompleted);
            }
        })
    }
    removeHandler = (value) => {
        console.log(value);
        this.props.removeItem(value);

    }
    completeHandler = (event) => {

        this.setState((prevState) => ({
            complete: prevState.complete == false ? true : false
        }))
    }
    render() {
        var textdeco;
        var allItems;
        var btnStyle = {};
        var compBtn_bgcolor;

        if (this.props.items.size != 0) {
            allItems = this.props.items.map((obj) => {
                {
                    obj.isCompleted === true ?
                        (textdeco = "line-through", btnStyle["bgcolor"] = "rgba(0, 255, 64, 0.63)", btnStyle["color"] = "white") :
                        (textdeco = "none", btnStyle["bgcolor"] = "rgba(255, 0, 0, 0.589)", btnStyle["color"] = "black")
                }
                const li_item = <li key={obj.item_name} id={obj.item_name}>
                    <div className="done-btn" onClick={() => this.doneHandler(obj)} style={{ color: btnStyle["color"], background: btnStyle["bgcolor"] }} > &#10004; </div>
                    <span id="li-text" style={{ textDecoration: textdeco }}>
                        {obj.item_name}
                    </span>
                    <svg id="edit-btn" onClick={() => this.editHandler(obj)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                    <div id="rm-btn" onClick={() => this.removeHandler(obj.item_name)} > &#10007; </div>
                </li>
                
                if (this.state.complete === false) {
                    compBtn_bgcolor = "white"
                    return  li_item 
                }
                else {
                    compBtn_bgcolor = "#b7b7b7"
                    if (obj.isCompleted === true) {
                        return  li_item 
                    }
                }
            })
        }


        return (
            <div id="todo-list">
                <div id="heading">To do List</div>
                <button id="completed-btn" onClick={this.completeHandler} style={{ background: compBtn_bgcolor }}>Completed</button>

                <input id="item" type="text" onChange={this.inputHandler} placeholder="enter task" onKeyDown={this.keyHandler}></input>
                <div >
                    {this.props.items.length != 0 ?
                        <div id="task-list" >
                            {allItems}
                        </div> : null
                        //<div id="add-text">Add some tasks</div> 
                    }
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        items: state.itemsList

    };
}

function matchDispatchToProps(dispatch) {
    return {
        addItem: (item) => dispatch(AddItem(item)),
        removeItem: (item) => dispatch(removeItem(item)),
        markCompleted: (item) => dispatch(completeItem(item)),
        edit: (old_item, new_item, isCompleted) => dispatch(editItem(old_item, new_item, isCompleted))
    }
    //bindActionCreators({ addItem: AddItem }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);