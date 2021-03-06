import {Constructor} from "../interfaces";
import {Container} from "../container";

export type InjectableId<T = any> = string | Constructor<T> | Symbol;

export interface ConfigurableDependency {
    injectId: InjectableId;
    optional?: boolean;
    factory?: boolean;
}

export type Dependency = InjectableId | ConfigurableDependency;

export function isConfigurableDependency(obj: Dependency): obj is ConfigurableDependency {
    if (typeof obj === 'string') return false;
    return 'injectId' in obj;
}

export interface Provider<T = any> {
    getMe(container: Container): T
    injectId: InjectableId<T>;
}

export function isProvider(input: any): input is Provider {
    return 'injectId' in input && 'getMe' in input;
}

export interface IFactory<T = any> {
    create(container: Container): T;
}

export function isFactory(obj: any): obj is IFactory {
    return 'create' in obj;
}