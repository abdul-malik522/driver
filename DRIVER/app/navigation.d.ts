import { NavigationProp } from '@react-navigation/native';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Main: undefined;
      NewOrder: undefined;
      Subscription: undefined;
      PaymentSuccess: undefined;
      PaymentFailed: undefined;
      SignIn: undefined;
      SignUp: undefined;
    }
  }
}

declare module '@react-navigation/native' {
  export function useNavigation<
    T extends NavigationProp<ReactNavigation.RootParamList>
  >(): T;
}
