import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  static const Color primaryLight = Color(0xFF5A8D5E);
  static const Color primaryDark = Color(0xFF48754B);
  static const Color accentLight = Color(0xFFF0851A);
  static const Color accentDark = Color(0xFFE06B12);
  
  static const Color backgroundLight = Color(0xFFFAFAF9);
  static const Color surfaceLight = Color(0xFFFFFFFF);
  static const Color surfaceVariantLight = Color(0xFFF5F3F0);
  static const Color onSurfaceLight = Color(0xFF1A1A18);
  
  static const Color backgroundDark = Color(0xFF1A1A18);
  static const Color surfaceDark = Color(0xFF2A2A28);
  static const Color surfaceVariantDark = Color(0xFF3A3A38);
  static const Color onSurfaceDark = Color(0xFFFAFAF9);

  static const Color success = Color(0xFF2E7D32);
  static const Color warning = Color(0xFFF57F17);
  static const Color error = Color(0xFFC62828);
  static const Color info = Color(0xFF0277BD);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      colorScheme: const ColorScheme.light(
        primary: primaryLight,
        onPrimary: Colors.white,
        primaryContainer: Color(0xFFE3EDE5),
        onPrimaryContainer: Color(0xFF1F3622),
        secondary: Color(0xFFF0851A),
        onSecondary: Colors.white,
        secondaryContainer: Color(0xFFFEF7EE),
        onSecondaryContainer: Color(0xFF411A09),
        tertiary: Color(0xFF2E7D32),
        onTertiary: Colors.white,
        tertiaryContainer: Color(0xFFE8F5E9),
        onTertiaryContainer: Color(0xFF1B5E20),
        error: Color(0xFFC62828),
        onError: Colors.white,
        errorContainer: Color(0xFFFDE0E0),
        onErrorContainer: Color(0xFF7F1D1D),
        surface: Colors.white,
        onSurface: Color(0xFF1A1A18),
        surfaceContainerHighest: Color(0xFFF5F3F0),
        onSurfaceVariant: Color(0xFF4A4845),
        outline: Color(0xFFD8D3CA),
        outlineVariant: Color(0xFFE8E4DD),
        shadow: Color(0x1A000000),
        scrim: Color(0x1A000000),
        inverseSurface: Color(0xFF2A2A28),
        onInverseSurface: Color(0xFFFAFAF9),
        inversePrimary: Color(0xFFC5D9C9),
        surfaceTint: primaryLight,
      ),
      canvasColor: Color(0xFFFAFAF9),
      scaffoldBackgroundColor: Color(0xFFFAFAF9),
      
      // Typography
      textTheme: _buildTextTheme(
        fontFamily: 'PlusJakartaSans',
        isDark: false,
      ),
      
      // AppBar
      appBarTheme: AppBarTheme(
        elevation: 0,
        scrolledUnderElevation: 1,
        surfaceTintColor: Colors.transparent,
        backgroundColor: Colors.white,
        foregroundColor: const Color(0xFF1A1A18),
        titleTextStyle: GoogleFonts.plusJakartaSans(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: const Color(0xFF1A1A18),
        ),
        systemOverlayStyle: SystemUiOverlayStyle.dark,
      ),
      
      // Cards
      cardTheme: CardThemeData(
        elevation: 0,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        color: Colors.white,
        surfaceTintColor: Colors.white,
        shadowColor: Colors.black.withValues(alpha: 0.03),
        elevation: 0,
        margin: EdgeInsets.zero,
      ),
      
      // Buttons
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          elevation: 0,
          backgroundColor: primaryLight,
          foregroundColor: Colors.white,
          disabledBackgroundColor: primaryLight.withValues(alpha: 0.4),
          disabledForegroundColor: Colors.white.withValues(alpha: 0.6),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
          textStyle: GoogleFonts.plusJakartaSans(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.2,
          ),
          minimumSize: const Size(88, 48),
        ),
      ),
      
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          backgroundColor: primaryLight,
          foregroundColor: Colors.white,
          disabledBackgroundColor: primaryLight.withValues(alpha: 0.4),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
          textStyle: GoogleFonts.plusJakartaSans(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.2,
          ),
        ),
      ),
      
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: primaryLight,
          side: BorderSide(color: primaryLight, width: 1.5),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
          textStyle: GoogleFonts.plusJakartaSans(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.2,
          ),
        ),
      ),
      
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: primaryLight,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          textStyle: GoogleFonts.plusJakartaSans(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.2,
          ),
        ),
      ),
      
      // Input
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: const Color(0xFFF5F3F0),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: primaryLight, width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0xFFC62828), width: 1),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0xFFC62828), width: 2),
        ),
        labelStyle: GoogleFonts.plusJakartaSans(
          color: const Color(0xFF8A8782),
          fontSize: 16,
          fontWeight: FontWeight.w400,
        ),
        hintStyle: GoogleFonts.plusJakartaSans(
          color: const Color(0xFF8A8782).withValues(alpha: 0.6),
          fontSize: 16,
        ),
        floatingLabelStyle: GoogleFonts.plusJakartaSans(
          color: primaryLight,
          fontSize: 14,
          fontWeight: FontWeight.w500,
        ),
        errorStyle: GoogleFonts.plusJakartaSans(
          color: const Color(0xFFC62828),
          fontSize: 12,
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      ),
      
      // Chips
      chipTheme: ChipThemeData(
        backgroundColor: const Color(0xFFF5F3F0),
        selectedColor: primaryLight,
        disabledColor: const Color(0xFFE8E4DD),
        labelStyle: GoogleFonts.plusJakartaSans(
          fontSize: 13,
          fontWeight: FontWeight.w500,
        ),
        secondaryLabelStyle: GoogleFonts.plusJakartaSans(
          fontSize: 13,
          fontWeight: FontWeight.w600,
          color: Colors.white,
        ),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        side: BorderSide.none,
      ),
      
      // Dialogs
      dialogTheme: DialogThemeData(
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
        elevation: 8,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        titleTextStyle: GoogleFonts.fraunces(
          fontSize: 22,
          fontWeight: FontWeight.w600,
          color: const Color(0xFF1A1A18),
        ),
        contentTextStyle: GoogleFonts.plusJakartaSans(
          fontSize: 16,
          color: const Color(0xFF4A4845),
        ),
      ),
      
      // Bottom Sheets
      bottomSheetTheme: BottomSheetThemeData(
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
        elevation: 8,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        ),
        modalBackgroundColor: Colors.white,
      ),
      
      // Navigation Bar
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
        elevation: 8,
        height: 72,
        labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
        indicatorColor: primaryLight.withValues(alpha: 0.12),
        labelTextStyle: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return GoogleFonts.plusJakartaSans(
              fontSize: 11,
              fontWeight: FontWeight.w600,
              color: primaryLight,
            );
          }
          return GoogleFonts.plusJakartaSans(
            fontSize: 11,
            fontWeight: FontWeight.w400,
            color: const Color(0xFF8A8782),
          );
        }),
      ),
      
      // Tabs
      tabBarTheme: TabBarThemeData(
        labelColor: primaryLight,
        unselectedLabelColor: const Color(0xFF8A8782),
        indicatorColor: primaryLight,
        indicatorSize: TabBarIndicatorSize.label,
        labelStyle: GoogleFonts.plusJakartaSans(
          fontSize: 14,
          fontWeight: FontWeight.w600,
        ),
        unselectedLabelStyle: GoogleFonts.plusJakartaSans(
          fontSize: 14,
          fontWeight: FontWeight.w400,
        ),
      ),
      
      // Dividers
      dividerTheme: DividerThemeData(
        color: const Color(0xFFE8E4DD),
        thickness: 1,
        space: 1,
      ),
      
      // List Tiles
      listTileTheme: ListTileThemeData(
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
        titleTextStyle: GoogleFonts.plusJakartaSans(
          fontSize: 16,
          fontWeight: FontWeight.w500,
          color: const Color(0xFF1A1A18),
        ),
        subtitleTextStyle: GoogleFonts.plusJakartaSans(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          color: const Color(0xFF8A8782),
        ),
        leadingAndTrailingTextStyle: GoogleFonts.plusJakartaSans(
          fontSize: 13,
          fontWeight: FontWeight.w500,
          color: const Color(0xFF4A4845),
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        tileColor: Colors.transparent,
        selectedTileColor: primaryLight.withValues(alpha: 0.08),
        selectedColor: primaryLight,
        iconColor: const Color(0xFF8A8782),
      ),
      
      // SnackBar
      snackBarTheme: SnackBarThemeData(
        behavior: SnackBarBehavior.floating,
        backgroundColor: const Color(0xFF1A1A18),
        contentTextStyle: GoogleFonts.plusJakartaSans(
          fontSize: 14,
          color: Colors.white,
        ),
        actionTextColor: accentLight,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
        elevation: 8,
      ),
      
      // Tooltips
      tooltipTheme: TooltipThemeData(
        decoration: BoxDecoration(
          color: const Color(0xFF1A1A18),
          borderRadius: BorderRadius.circular(10),
        ),
        textStyle: GoogleFonts.plusJakartaSans(
          fontSize: 12,
          color: Colors.white,
        ),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      ),
      
      // Progress Indicators
      progressIndicatorTheme: ProgressIndicatorThemeData(
        color: primaryLight,
        linearTrackColor: primaryLight.withValues(alpha: 0.2),
        circularTrackColor: primaryLight.withValues(alpha: 0.2),
      ),
      
      // Scaffold
      scaffoldBackgroundColor: const Color(0xFFFAFAF9),
      
      // Platform Overrides
      platform: TargetPlatform.iOS,
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: const ColorScheme.dark(
        primary: Color(0xFF78A37D),
        onPrimary: Color(0xFF0D1B10),
        primaryContainer: Color(0xFF3A5E3D),
        onPrimaryContainer: Color(0xFFE3EDE5),
        secondary: Color(0xFFF4A142),
        onSecondary: Color(0xFF1A1A18),
        secondaryContainer: Color(0xFF411A09),
        onSecondaryContainer: Color(0xFFFEF7EE),
        tertiary: Color(0xFF4CAF50),
        onTertiary: Color(0xFF0D1B10),
        tertiaryContainer: Color(0xFF1B5E20),
        onTertiaryContainer: Color(0xFFE8F5E9),
        error: Color(0xFFEF5350),
        onError: Color(0xFF1A1A18),
        errorContainer: Color(0xFF7F1D1D),
        onErrorContainer: Color(0xFFFDE0E0),
        surface: Color(0xFF1A1A18),
        onSurface: Color(0xFFFAFAF9),
        surfaceContainerHighest: Color(0xFF3A3A38),
        onSurfaceVariant: Color(0xFFC4BEB2),
        outline: Color(0xFF8A8782),
        outlineVariant: Color(0xFF4A4845),
        shadow: Color(0x4D000000),
        scrim: Color(0x4D000000),
        inverseSurface: Color(0xFFFAFAF9),
        onInverseSurface: Color(0xFF1A1A18),
        inversePrimary: primaryLight,
        surfaceTint: Color(0xFF78A37D),
      ),
      canvasColor: const Color(0xFF1A1A18),
      scaffoldBackgroundColor: const Color(0xFF1A1A18),
      
      textTheme: _buildTextTheme(
        fontFamily: 'PlusJakartaSans',
        isDark: true,
      ),
      
      appBarTheme: AppBarTheme(
        elevation: 0,
        scrolledUnderElevation: 1,
        surfaceTintColor: Colors.transparent,
        backgroundColor: const Color(0xFF1A1A18),
        foregroundColor: const Color(0xFFFAFAF9),
        titleTextStyle: GoogleFonts.plusJakartaSans(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: const Color(0xFFFAFAF9),
        ),
        systemOverlayStyle: SystemUiOverlayStyle.light,
      ),
      
      cardTheme: CardThemeData(
        elevation: 0,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        color: const Color(0xFF2A2A28),
        surfaceTintColor: const Color(0xFF2A2A28),
        shadowColor: Colors.black.withValues(alpha: 0.2),
        margin: EdgeInsets.zero,
      ),
      
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          elevation: 0,
          backgroundColor: const Color(0xFF78A37D),
          foregroundColor: const Color(0xFF0D1B10),
          disabledBackgroundColor: const Color(0xFF78A37D).withValues(alpha: 0.4),
          disabledForegroundColor: const Color(0xFF0D1B10).withValues(alpha: 0.6),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
          textStyle: GoogleFonts.plusJakartaSans(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.2,
          ),
          minimumSize: const Size(88, 48),
        ),
      ),
      
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(
          backgroundColor: const Color(0xFF78A37D),
          foregroundColor: const Color(0xFF0D1B10),
          disabledBackgroundColor: const Color(0xFF78A37D).withValues(alpha: 0.4),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
          textStyle: GoogleFonts.plusJakartaSans(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.2,
          ),
        ),
      ),
      
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: const Color(0xFF78A37D),
          side: const BorderSide(color: Color(0xFF78A37D), width: 1.5),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
          textStyle: GoogleFonts.plusJakartaSans(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.2,
          ),
        ),
      ),
      
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: const Color(0xFF78A37D),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          textStyle: GoogleFonts.plusJakartaSans(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.2,
          ),
        ),
      ),
      
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: const Color(0xFF2A2A28),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide.none,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: BorderSide.none,
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0xFF78A37D), width: 2),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0xFFEF5350), width: 1),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: Color(0xFFEF5350), width: 2),
        ),
        labelStyle: GoogleFonts.plusJakartaSans(
          color: const Color(0xFFC4BEB2),
          fontSize: 16,
          fontWeight: FontWeight.w400,
        ),
        hintStyle: GoogleFonts.plusJakartaSans(
          color: const Color(0xFFC4BEB2).withValues(alpha: 0.6),
          fontSize: 16,
        ),
        floatingLabelStyle: GoogleFonts.plusJakartaSans(
          color: const Color(0xFF78A37D),
          fontSize: 14,
          fontWeight: FontWeight.w500,
        ),
        errorStyle: GoogleFonts.plusJakartaSans(
          color: const Color(0xFFEF5350),
          fontSize: 12,
        ),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      ),
      
      chipTheme: ChipThemeData(
        backgroundColor: const Color(0xFF3A3A38),
        selectedColor: const Color(0xFF78A37D),
        disabledColor: const Color(0xFF3A3A38),
        labelStyle: GoogleFonts.plusJakartaSans(
          fontSize: 13,
          fontWeight: FontWeight.w500,
          color: const Color(0xFFFAFAF9),
        ),
        secondaryLabelStyle: GoogleFonts.plusJakartaSans(
          fontSize: 13,
          fontWeight: FontWeight.w600,
          color: const Color(0xFF0D1B10),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        side: BorderSide.none,
      ),
      
      dialogTheme: DialogThemeData(
        backgroundColor: const Color(0xFF2A2A28),
        surfaceTintColor: const Color(0xFF2A2A28),
        elevation: 8,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        titleTextStyle: GoogleFonts.fraunces(
          fontSize: 22,
          fontWeight: FontWeight.w600,
          color: const Color(0xFFFAFAF9),
        ),
        contentTextStyle: GoogleFonts.plusJakartaSans(
          fontSize: 16,
          color: const Color(0xFFC4BEB2),
        ),
      ),
      
      bottomSheetTheme: BottomSheetThemeData(
        backgroundColor: const Color(0xFF2A2A28),
        surfaceTintColor: const Color(0xFF2A2A28),
        elevation: 8,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
        ),
        modalBackgroundColor: const Color(0xFF2A2A28),
      ),
      
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: const Color(0xFF1A1A18),
        surfaceTintColor: const Color(0xFF1A1A18),
        elevation: 8,
        height: 72,
        labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
        indicatorColor: const Color(0xFF78A37D).withValues(alpha: 0.12),
        labelTextStyle: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.selected)) {
            return GoogleFonts.plusJakartaSans(
              fontSize: 11,
              fontWeight: FontWeight.w600,
              color: const Color(0xFF78A37D),
            );
          }
          return GoogleFonts.plusJakartaSans(
            fontSize: 11,
            fontWeight: FontWeight.w400,
            color: const Color(0xFFC4BEB2),
          );
        }),
      ),
      
      tabBarTheme: TabBarThemeData(
        labelColor: const Color(0xFF78A37D),
        unselectedLabelColor: const Color(0xFFC4BEB2),
        indicatorColor: const Color(0xFF78A37D),
        indicatorSize: TabBarIndicatorSize.label,
        labelStyle: GoogleFonts.plusJakartaSans(
          fontSize: 14,
          fontWeight: FontWeight.w600,
        ),
        unselectedLabelStyle: GoogleFonts.plusJakartaSans(
          fontSize: 14,
          fontWeight: FontWeight.w400,
        ),
      ),
      
      dividerTheme: DividerThemeData(
        color: const Color(0xFF4A4845),
        thickness: 1,
        space: 1,
      ),
      
      listTileTheme: ListTileThemeData(
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
        titleTextStyle: GoogleFonts.plusJakartaSans(
          fontSize: 16,
          fontWeight: FontWeight.w500,
          color: const Color(0xFFFAFAF9),
        ),
        subtitleTextStyle: GoogleFonts.plusJakartaSans(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          color: const Color(0xFFC4BEB2),
        ),
        leadingAndTrailingTextStyle: GoogleFonts.plusJakartaSans(
          fontSize: 13,
          fontWeight: FontWeight.w500,
          color: const Color(0xFFC4BEB2),
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        tileColor: Colors.transparent,
        selectedTileColor: const Color(0xFF78A37D).withValues(alpha: 0.12),
        selectedColor: const Color(0xFF78A37D),
        iconColor: const Color(0xFFC4BEB2),
      ),
      
      snackBarTheme: SnackBarThemeData(
        behavior: SnackBarBehavior.floating,
        backgroundColor: const Color(0xFFFAFAF9),
        contentTextStyle: GoogleFonts.plusJakartaSans(
          fontSize: 14,
          color: const Color(0xFF1A1A18),
        ),
        actionTextColor: const Color(0xFFF0851A),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
        elevation: 8,
      ),
      
      tooltipTheme: TooltipThemeData(
        decoration: BoxDecoration(
          color: const Color(0xFFFAFAF9),
          borderRadius: BorderRadius.circular(10),
        ),
        textStyle: GoogleFonts.plusJakartaSans(
          fontSize: 12,
          color: const Color(0xFF1A1A18),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      ),
      
      progressIndicatorTheme: ProgressIndicatorThemeData(
        color: const Color(0xFF78A37D),
        linearTrackColor: const Color(0xFF78A37D).withValues(alpha: 0.2),
        circularTrackColor: const Color(0xFF78A37D).withValues(alpha: 0.2),
      ),
      
      scaffoldBackgroundColor: const Color(0xFF1A1A18),
      
      platform: TargetPlatform.iOS,
    );
  }

  static TextTheme _buildTextTheme({required String fontFamily, required bool isDark}) {
    final baseColor = isDark ? const Color(0xFFFAFAF9) : const Color(0xFF1A1A18);
    final mutedColor = isDark ? const Color(0xFFC4BEB2) : const Color(0xFF8A8782);
    
    return TextTheme(
      displayLarge: GoogleFonts.fraunces(
        fontSize: 57,
        fontWeight: FontWeight.w400,
        letterSpacing: -0.25,
        color: baseColor,
      ),
      displayMedium: GoogleFonts.fraunces(
        fontSize: 45,
        fontWeight: FontWeight.w400,
        letterSpacing: 0,
        color: baseColor,
      ),
      displaySmall: GoogleFonts.fraunces(
        fontSize: 36,
        fontWeight: FontWeight.w400,
        letterSpacing: 0,
        color: baseColor,
      ),
      headlineLarge: GoogleFonts.fraunces(
        fontSize: 32,
        fontWeight: FontWeight.w600,
        letterSpacing: 0,
        color: baseColor,
      ),
      headlineMedium: GoogleFonts.fraunces(
        fontSize: 28,
        fontWeight: FontWeight.w600,
        letterSpacing: 0,
        color: baseColor,
      ),
      headlineSmall: GoogleFonts.fraunces(
        fontSize: 24,
        fontWeight: FontWeight.w600,
        letterSpacing: 0,
        color: baseColor,
      ),
      titleLarge: GoogleFonts.plusJakartaSans(
        fontSize: 22,
        fontWeight: FontWeight.w600,
        letterSpacing: 0,
        color: baseColor,
      ),
      titleMedium: GoogleFonts.plusJakartaSans(
        fontSize: 16,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.15,
        color: baseColor,
      ),
      titleSmall: GoogleFonts.plusJakartaSans(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.1,
        color: baseColor,
      ),
      bodyLarge: GoogleFonts.plusJakartaSans(
        fontSize: 16,
        fontWeight: FontWeight.w400,
        letterSpacing: 0.5,
        color: baseColor,
        height: 1.5,
      ),
      bodyMedium: GoogleFonts.plusJakartaSans(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        letterSpacing: 0.25,
        color: baseColor,
        height: 1.5,
      ),
      bodySmall: GoogleFonts.plusJakartaSans(
        fontSize: 12,
        fontWeight: FontWeight.w400,
        letterSpacing: 0.4,
        color: mutedColor,
        height: 1.5,
      ),
      labelLarge: GoogleFonts.plusJakartaSans(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        letterSpacing: 0.1,
        color: baseColor,
      ),
      labelMedium: GoogleFonts.plusJakartaSans(
        fontSize: 12,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.5,
        color: mutedColor,
      ),
      labelSmall: GoogleFonts.plusJakartaSans(
        fontSize: 11,
        fontWeight: FontWeight.w500,
        letterSpacing: 0.5,
        color: mutedColor,
      ),
    ).apply(
      bodyColor: baseColor,
      displayColor: baseColor,
    );
  }
}