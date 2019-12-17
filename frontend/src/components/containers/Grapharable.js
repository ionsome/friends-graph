import { Userable } from "./Userable";
import { nodes, edges } from '../../consts';

class Grapharable extends Userable {
  constructor(props) {
    super(props);
    // нужен для хранения пользователей
    this.users = nodes;

    this.state = {
      users: this.users, // нужен для отображения
      relations: edges,
      agregators: false
    };
  }

  addUser(profile) {
    if (super.addUser(profile) && this.graph) this.graph.addNodes([profile]);
  }

  addUserList(profiles) {
    const res = profiles.filter(e => e && !this.isUserPresentWithId(e.id));
    this.users.push(...res);
    this.setState({ users: this.users });
    this.graph.addNodes(res);
    return true;
  }

  removeUser(profile) {
    if (super.removeUser(profile) && this.graph) this.graph.removeNodeById(profile.id);
  }

  addRelations(new_relations) {
    super.addRelations(new_relations);
    if (this.graph) this.graph.addEdges(new_relations);
  }

  bindGraph(graph) {
    console.log("graph is bound");
    console.log(graph);
    this.graph = graph;
  }

  setProfileVisibility(profile, value, notHideIfShown) {
    console.log('profile:');
    console.log(profile);

    if (!profile)
      return;
    // Если профиль не скрыт и его не нужно скрывать
    if (!profile.hidden && notHideIfShown)
    {
      console.log('профиль открыт, пропуск')
      return;
    }
    profile.hidden = !value;
    console.log(profile.hidden);
    this.graph.setHiddenById(profile.id, !value);
  }

  clearUsers() {
    this.users = [];
    this.setState({ users: this.users });
    this.graph.clearNodes();
  }

  render() {
    return this.props.children(
      this.state.users,
      this.state.relations,
      this.addRootUser.bind(this),
      this.addUser.bind(this),
      this.removeUser.bind(this),
      this.bindGraph.bind(this),
      this.useAggregators.bind(this),
      this.clearUsers.bind(this)
    );
  }
}

export { Grapharable };
