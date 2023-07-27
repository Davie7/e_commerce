import 'dart:convert';

import 'package:e_commerce_app/features/home/screens/home_screen.dart';
import 'package:e_commerce_app/providers/user_provider.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'package:e_commerce_app/constants/error_handling.dart';
import 'package:e_commerce_app/constants/global_variables.dart';
import 'package:e_commerce_app/constants/utils.dart';
import 'package:e_commerce_app/models/user.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AuthService {
  // sign up user
  void signUpUser({
    required BuildContext context,
    required String name,
    required String email,
    required String password,
  }) async {
    try {
      User user = User(
          id: '',
          name: name,
          email: email,
          password: password,
          address: '',
          type: '',
          token: '');

      // The first parameter is the URL to which the POST request is sent. It uses Uri.parse() to convert a string into a Uri.
      // The second parameter is the request body. The user.toJson() method is called to convert the User object into a JSON representation.
      // The third parameter is a map representing the headers for the request. In this case, it sets the "Content-Type" header to "application/json; charset=UTF-8".
      // This header indicates that the request body is in JSON format.
      http.Response res = await http.post(Uri.parse('$uri/api/signup'),
          body: user.toJson(),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          });

      httpErrorHandle(
        response: res,
        context: context,
        onSuccess: () {
          showSnackBar(
              context, 'Account created! Login with the same credentials!');
        },
      );
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }

  // sign in user
  void signInUser({
    required BuildContext context,
    required String email,
    required String password,
  }) async {
    try {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      String? token = prefs.getString('x-auth-token');

      if (token == null) {
        prefs.setString('x-auth-token', '');
      }

      await http.post(
        Uri.parse('$uri/tokenIsValid'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
          'x-auth-token': token!
        },
      );
      // http.Response res = await http.post(Uri.parse('$uri/api/signin'),
      //     body: jsonEncode({
      //       "email": email,
      //       "password": password,
      //     }),
      //     headers: <String, String>{
      //       'Content-Type': 'application/json; charset=UTF-8',
      //     });

      // print(res.body);
      // httpErrorHandle(
      //   response: res,
      //   context: context,
      //   onSuccess: () async {
      //     SharedPreferences prefs = await SharedPreferences.getInstance();
      //     Provider.of<UserProvider>(context, listen: false).setUser(res.body);
      //     await prefs.setString('x-auth-token', jsonDecode(res.body)['token']);
      //     Navigator.pushNamedAndRemoveUntil(
      //       context,
      //       HomeScreen.routeName,
      //       (route) => false,
      //     );
      //   },
      // );
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }
}
