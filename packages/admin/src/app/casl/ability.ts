import { Ability, AbilityClass, AbilityBuilder } from '@casl/ability';

export enum Role {
  Author = 'Author',
  Editor = 'Editor',
  Admin = 'Admin',
}

interface Model {
  id: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface User extends Model {
  email: string;
  role: string;
  role_fmt?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  avatar?: string;
}

export interface Post extends Model {
  name: string;
  created_by?: number;
  //readonly client?: User;
}

const manage = ['create', 'read', 'update', 'delete'];
type Actions = typeof manage[number];
export type Subjects = 'Post' | 'User' | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;
export const AppAbilityClass = Ability;

export const defineAbilityFor = (user?: User): AppAbility => {
  // @ts-ignore
  const { can, rules } = new AbilityBuilder<AppAbility>();
  // @ts-ignore
  const role = Role[user?.role];

  switch (role) {
    case Role.Admin:
      can(manage, 'Post');
      can(manage, 'User');
      break;
    case Role.Editor:
      can(['read'], 'User');
      can(manage, 'Post');
      break;
  }

  return new AppAbilityClass(rules);
};

export default defineAbilityFor;
