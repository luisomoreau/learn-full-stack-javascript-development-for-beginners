import {Model} from '@mean-expert/model';
/**
 * @module ingredient
 * @description
 **/
@Model({
  hooks: {
    access: {name: 'access', type: 'operation'},
    persist: {name: 'persist', type: 'operation'},
    beforeSave: {name: 'before save', type: 'operation'},
    afterSave: {name: 'after save', type: 'operation'},
    beforeDelete: {name: 'before delete', type: 'operation'},
    afterDelete: {name: 'after delete', type: 'operation'},
    beforeMyRemote: {name: 'myRemote', type: 'beforeRemote'},
    afterMyRemote: {name: 'myRemote', type: 'afterRemote'},
  },
  remotes: {
    myRemote: {
      returns: {arg: 'result', type: 'array'},
      http: {path: '/my-remote', verb: 'get'}
    }
  }
})

class Ingredient {
  constructor(public model: any) {
  }

  access(ctx: any, next: Function): void {
    console.log('ingredient: access');
    next();
  }

  persist(ctx: any, next: Function): void {
    console.log('ingredient: persist');
    next();
  }

  beforeSave(ctx: any, next: Function): void {
    console.log('ingredient: before Save');
    next();
  }

  afterSave(ctx: any, next: Function): void {
    console.log('ingredient: before Save');
    next();
  }

  beforeDelete(ctx: any, next: Function): void {
    console.log('ingredient: before Delete');
    next();
  }

  afterDelete(ctx: any, next: Function): void {
    console.log('ingredient: after Delete');
    next();
  }

  beforeMyRemote(ctx: any, next: Function) {
    console.log('ingredient: before myRemote');
    next();
  }

  myRemote(next: Function): void {
    console.log('ingredient: myRemote');
    this.model.find(next);
  }

  afterMyRemote(ctx: any, next: Function) {
    console.log('ingredient: after myRemote');
    next();
  }

}

module.exports = Ingredient;
