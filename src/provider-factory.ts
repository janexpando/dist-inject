import {ClassProvider, InjectableId, Provider, ValueProvider} from "./provider";
import {Constructor} from "./interfaces";

export interface ValueProviderOptions<P = any, T = any> {
    provide: InjectableId<P>;
    value: T;
}

export interface ClassProviderOptions<P = any, T = any> {
    provide: InjectableId<P>;
    useClass: Constructor<T>;
    singleton?: boolean;
}

export type ProviderOptions = Constructor | ClassProviderOptions | ValueProviderOptions;

export class ProviderFactory {


    createProvider(input: ProviderOptions): Provider {
        if (this.isConstructor(input)) {
            return new ClassProvider(input, input);
        }
        if (this.isValueProviderOptions(input)) {
            return new ValueProvider(input.provide, input.value);
        }
        if (this.isClassProviderOptions(input)) {
            return new ClassProvider(input.provide, input.useClass);
        }
    }

    isConstructor<T = any>(constructor): constructor is Constructor<T> {
        return 'prototype' in constructor && 'isPrototypeOf' in constructor;
    }

    isValueProviderOptions(provider): provider is ValueProviderOptions {
        return 'value' in provider && 'provide' in provider;
    }

    isClassProviderOptions(provider): provider is ClassProviderOptions {
        return 'provide' in provider && 'useClass' in provider;
    }
}