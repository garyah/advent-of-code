#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2017/CaptchaDigitSummer.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2017;

namespace advent2017tests
{
    TEST_CLASS(CaptchaDigitSummerTests)
    {
    public:

        TEST_METHOD(TestMethod01a1)
        {
            Assert::AreEqual(3u, CaptchaDigitSummer::sumRepeating("1122"));
        }

        TEST_METHOD(TestMethod01a2)
        {
            CaptchaDigitSummer summer;
            Assert::AreEqual(4u, CaptchaDigitSummer::sumRepeating("1111"));
        }

        TEST_METHOD(TestMethod01a3)
        {
            Assert::AreEqual(0u, CaptchaDigitSummer::sumRepeating("1234"));
        }

        TEST_METHOD(TestMethod01a4)
        {
            Assert::AreEqual(9u, CaptchaDigitSummer::sumRepeating("91212129"));
        }

        TEST_METHOD(TestMethod01b1)
        {
            Assert::AreEqual(6u, CaptchaDigitSummer::sumRepeatingOtherHalf("1212"));
        }

        TEST_METHOD(TestMethod01b2)
        {
            Assert::AreEqual(0u, CaptchaDigitSummer::sumRepeatingOtherHalf("1221"));
        }

        TEST_METHOD(TestMethod01b3)
        {
            Assert::AreEqual(4u, CaptchaDigitSummer::sumRepeatingOtherHalf("123425"));
        }

        TEST_METHOD(TestMethod01b4)
        {
            Assert::AreEqual(12u, CaptchaDigitSummer::sumRepeatingOtherHalf("123123"));
        }

        TEST_METHOD(TestMethod01b5)
        {
            Assert::AreEqual(4u, CaptchaDigitSummer::sumRepeatingOtherHalf("12131415"));
        }
    };
}
