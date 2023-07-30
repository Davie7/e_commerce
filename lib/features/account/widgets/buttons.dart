import 'package:e_commerce_app/features/account/widgets/account_button.dart';
import 'package:flutter/material.dart';
import 'package:gap/gap.dart';

class Buttons extends StatefulWidget {
  const Buttons({super.key});

  @override
  State<Buttons> createState() => _ButtonsState();
}

class _ButtonsState extends State<Buttons> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            AccountButton(
              text: 'Your Orders',
              onPressed: () {},
            ),
            AccountButton(
              text: 'Turn Sellers',
              onPressed: () {},
            ),
          ],
        ),
        const Gap(10),
        Row(
          children: [
            AccountButton(
              text: 'Log Out',
              onPressed: () {},
            ),
            AccountButton(
              text: 'Your Wish List',
              onPressed: () {},
            ),
          ],
        ),
      ],
    );
  }
}
