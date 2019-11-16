import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap'

const VK = window.VK

class AuthPage extends Component {

    constructor(props) {
        super(props);
    }

     loginButtonClickHandler = () => {
        let popup = window.open("https://oauth.vk.com/authorize?client_id=7154329&display=popup&redirect_uri=close.html&scope=friends&response_type=code&v=5.101", 'test', "height=200,width=200");
        let timer = setInterval(function() {
            if(popup.closed) {
                clearInterval(timer);
                window.location.href = '/';
            }
        }, 1000);
    };

    statusButtonClickHandler = () => {
        VK.Auth.getLoginStatus(function(response) {
            alert(response);
            if (response.session) {
                // Пользователь успешно авторизовался
                if (response.settings) {
                    // Выбранные настройки доступа пользователя, если они были запрошены
                }
            } else {
                // Пользователь нажал кнопку 'Отмена' в окне авторизации
            }
        });
    };

    render() {
        return (
            <div>
                <Button onClick={this.loginButtonClickHandler} variation="primary">Log in</Button>
                <Button onClick={this.statusButtonClickHandler} variation="primary">Status</Button>
            </div>
        );
    }
}

export default withRouter(AuthPage);
