import 'package:flutter_riverpod/flutter_riverpod.dart';

class AdminUser {
  final String name;
  final String email;
  final String role;
  final String? image;

  AdminUser({
    required this.name,
    required this.email,
    required this.role,
    this.image,
  });
}

class AuthState {
  final bool isLoggedIn;
  final AdminUser? user;

  AuthState({
    this.isLoggedIn = false,
    this.user,
  });

  AuthState copyWith({
    bool? isLoggedIn,
    AdminUser? user,
  }) {
    return AuthState(
      isLoggedIn: isLoggedIn ?? this.isLoggedIn,
      user: user ?? this.user,
    );
  }
}

class AuthNotifier extends StateNotifier<AuthState> {
  AuthNotifier() : super(AuthState());

  void login(String email, String password) {
    // Dummy login logic
    state = state.copyWith(
      isLoggedIn: true,
      user: AdminUser(
        name: 'Amisha',
        email: email,
        role: 'admin',
      ),
    );
  }

  void signOut() {
    state = AuthState();
  }
}

final authStateProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier();
});
