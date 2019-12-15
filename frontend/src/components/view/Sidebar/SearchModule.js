import React, { Component } from "react";
import { FormControl, Button } from "react-bootstrap";
import searchIcon from "../../../res/search.svg";


let filterInput = async (searchLine, userList, defaultUser) => {
    let newListModel;
    // Если строка пустая, то следует вернуть список рутовых юзеров
    if (searchLine === "") {
        newListModel = userList.filter(user => user.root);

        // Если список юзеров пустой, то вернуть дефолтного юзера
        if (newListModel.length === 0) {
            newListModel = defaultUser ? [defaultUser] : [];
        }
        return newListModel;
    }

    const re = /^(?:https{0,1}:\/\/)?vk.com\/(?:id(\d+)|([a-zA-Z0-9]{2,})) *$/;
    const match = re.exec(searchLine);

    if (match && match[2] !== 'id') {
        // проверка наличия пользователя
        if (match[1]) {
            const matchedId = parseInt(match[1]);
            const res = userList.filter(user => user.id === matchedId);
            if (res.length > 0)
                return res;
        }
        else {
            const matchedDomain = match[2];
            const res = userList.filter(user => user.domain === matchedDomain);
            if (res.length > 0)
                return res;
        }
        return [{
            "id": '-2',
            "label": "New User",
            "color": "",
            "image": "https://vk.com/images/camera_200.png?ava=1",
            "root": false
        }]
    }
    return userList.filter(user => user.label.toLowerCase().includes(searchLine.toLowerCase()));
}

const UPDATE_TIMEOUT = 400;

class SearchModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchLine: "",
            collapsed: this.props.collapsed
        };

        this.timer = null; // нужен для задержки при вводе
    }

    searchInputHandler = (event) => {
        const value = event.target.value;
        this.setState({ searchLine: value });
        clearTimeout(this.timer);

        this.timer = setTimeout(
            () => this.props.updateSearchLine(value),
            value === '' ? 0 : UPDATE_TIMEOUT
        );
    }

    static getDerivedStateFromProps(props, state) {
        const delta = {};

        if (props.collapsed !== state.collapsed)
            delta.collapsed = props.collapsed;

        if (delta) return delta;
        return false;
    }

    render() {
        return this.state.collapsed ?
            (<>
                <Button
                    onClick={this.props.showButtonClickHandler}
                    variant="sidebar-light">
                    <img
                        alt="search"
                        src={searchIcon}
                        width="30"
                        height="34"
                        className="mt-1 mb-1"
                    />
                </Button>
            </>)
            : (<FormControl
                onChange={this.searchInputHandler}
                className="m-2 w-auto"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={this.state.searchLine}
            />)
    }
}


export { SearchModule, filterInput };