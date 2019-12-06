import { Profile } from "../../models/Profile";
import { users_get, friends_get, vkscript_execute } from "../../api/Friends";
import { Component } from "react";

class Userable extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      relations: []
    };
  }

  /*
        Добавляет рутового юзера
    */
  async addRootUser(id) {
    let user = this.isUserPresentWithId(id);
    if (!user) {
      user = await this.createProfileById(id);
      this.addUser(user);
    }

    this.changeToRoot(user);
  }

  /*
        Меняет тип юзера на рутовый и добавляет всех его друзей
    */
  async changeToRoot(rootUser) {
    // Проверка, если юзер уже рутовый
    if (rootUser.root) {
      return;
    }
    rootUser.root = true;

    let friends = await friends_get(rootUser.id);

    for (const friend of friends) {
      let profile = this.createProfileByData(friend);
      this.addUser(profile);
    }
    console.log("userlist:");
    console.log(this.state.users);
    await this.addUserRelationsWithProfiles(rootUser, friends);
    await this.connectFriends(friends);
    console.log("rels:");
    console.log(this.state.relations);
  }

  async createProfileById(id) {
    let data = await users_get([id]);
    data = data[0];
    if (
      !this.state.users.some(
        element => data === undefined || element.id === data.id
      )
    ) {
      return this.createProfileByData(data);
    }
  }

  createProfileByData(data) {
    return new Profile(
      data.id,
      data.first_name,
      data.last_name,
      data.photo_200
    );
  }

  addUser(profile) {
    if (!this.isUserPresentWithId(profile.id)) {
      this.setState({ users: [...this.state.users, profile] });
      if (this.graph) this.graph.addNodes([profile]);
    }
  }

  /*
        Соединяет друзей между собой и добавленными юзерами 
    */
  async connectFriends(friends) {
    for (let index = 0; index < friends.length; index += 25) {
      let lastIndex = Math.min(friends.length, index + 25);
      let requestedUsers = friends.slice(index, lastIndex);
      let usersPayload = requestedUsers.map(elem => {
        return `{id: ${elem.id},rels: API.friends.get({user_id: ${elem.id}})}`;
      });

      let respond = await vkscript_execute(`return [${usersPayload}];`);
      console.log(respond);
      for (let n = 0; n < respond.length; n++) {
        let relations = respond[n].rels;
        if (relations)
          await this.addUserRelationsWithIds(
            friends[index + n],
            relations.items
          );
      }
    }
  }

  /*
        Добавляет связи между текущим пользователем и теми, кто
        уже добавлен в users.
    
        Также, можно передать список id друзей через параметр friends. 
    */
  async addUserRelations(profile, friends) {
    friends = friends || [];
    if (!friends.length) {
      friends = await friends_get(profile.id, true);
      if (!friends.length) return;
    }

    let user_ids = this.state.users.map(elem => elem.id);
    let new_relations = friends
      .filter(n => user_ids.indexOf(n) > -1)
      .map(n =>
        profile.id < n
          ? { from: profile.id, to: n }
          : { from: n, to: profile.id }
      )
      .filter(rel => !this.isRelationPresent(rel));
    this.state.relations = this.state.relations.concat(new_relations);
    if (this.graph) this.graph.addEdges(new_relations);
  }

  /*
        Тоже, что и addUserRelations, но параметр friends принимает профили.
    */
  async addUserRelationsWithProfiles(profile, friends) {
    friends = friends || [];
    if (friends.length) {
      friends = friends.map(elem => elem.id);
    }
    await this.addUserRelations(profile, friends);
  }

  /*
        Тоже, что и addUserRelations.
    */
  async addUserRelationsWithIds(profile, friends) {
    await this.addUserRelations(profile, friends);
  }

  isRelationPresent(relation) {
    for (const anotherRelation of this.state.relations)
      if (
        relation.from === anotherRelation.from &&
        relation.to === anotherRelation.to
      ) {
        return true;
      }
    return false;
  }

  /*
        Возвращает профиль юзера, если
        соответствующий был найден
    */
  isUserPresentWithId(userId) {
    for (const anotherUser of this.state.users)
      if (userId === anotherUser.id) {
        return anotherUser;
      }
    return false;
  }

  removeUser(userId) {}

  bindGraph(graph) {
    this.graph = graph;
  }

  render() {
    return this.props.children(
      this.state.users,
      this.state.relations,
      this.addRootUser.bind(this),
      this.bindGraph.bind(this)
    );
  }
}

export { Userable };