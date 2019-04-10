import {Model} from '@mean-expert/model';

/**
 * @module recipe
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
    incrementViews: {
      description: ["Increment a given recipe views"],
      returns: {arg: 'views', type: 'number'},
      http: {path: '/:id/increment-views', verb: 'get'},
      accepts: [
        {arg: "id", required: true, type: "string", http: {source: 'path'}, description: "Recipe Id"}
      ]
    }
  }
})

class Recipe {
  constructor(public model: any) {
  }

  access(ctx: any, next: Function): void {
    console.log('recipe: access');
    next();
  }

  persist(ctx: any, next: Function): void {
    console.log('recipe: persist');
    next();
  }

  beforeSave(ctx: any, next: Function): void {
    // console.log('recipe: before Save', ctx);
    if (ctx.isNewInstance) {
      ctx.instance.userId = ctx.options.accessToken.userId;
    }
    next();
  }

  afterSave(ctx: any, next: Function): void {
    console.log('recipe: before Save');
    next();
  }

  beforeDelete(ctx: any, next: Function): void {
    console.log('recipe: before Delete');
    next();
  }

  afterDelete(ctx: any, next: Function): void {
    console.log('recipe: after Delete');
    next();
  }

  incrementViews(id: string, next: Function): void {
    // console.log('recipe: myRemote');
    this.model.updateAll(
      {id: id},
      {'$inc': {views: 1}},
      {allowExtendedOperators: true},
      (err: any, result: any) => {
        if (err) {
          next(err);
        }
        // console.log(result);
        this.model.findById(id, {fields: {views: true}}, (err: any, instance: any) => {
          next(err, instance.views);
        })

      }
    );
  }

}

module.exports = Recipe;
