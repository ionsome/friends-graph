import { Userable } from "./Userable";

class Grapharable extends Userable {

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
    if (!profile || !profile.hidden && notHideIfShown) {
      return;
    }
    profile.hidden = !value;
    if (profile.image == '') {
      profile.image = profile.hidden_image;
      this.graph.setHiddenById(profile.id, !value, profile.hidden_image);
    }
    else
      this.graph.setHiddenById(profile.id, !value, false);
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
