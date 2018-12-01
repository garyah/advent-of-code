#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2017/GeneratorDriver.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2017;

namespace advent2017tests
{
    TEST_CLASS(GeneratorDriverTests)
    {
    public:
        TEST_METHOD(InitialBothZeroReturnsNumberOfRuns)
        {
            Assert::AreEqual(40u*1000u*1000u, GeneratorDriver::DriveAndReturnNumberOfMatches(0u, 0u, 40u*1000u*1000u));
        }

        TEST_METHOD(Initial65And8921For5RunsMatchesOnce)
        {
            Assert::AreEqual(1u, GeneratorDriver::DriveAndReturnNumberOfMatches(65u, 8921u, 5u));
        }

        TEST_METHOD(Initial65And8921For40MRunsMatches588Times)
        {
            Assert::AreEqual(588u, GeneratorDriver::DriveAndReturnNumberOfMatches(65u, 8921u, 40u*1000u*1000u));
        }

        TEST_METHOD(Initial65And8921For5RunsDoesNotMatchWhenPicky)
        {
            Assert::AreEqual(0u, GeneratorDriver::DriveAndReturnNumberOfMatches(65u, 8921u, 5u, true));
        }

        TEST_METHOD(Initial65And8921For1056RunsMatchesOnceWhenPicky)
        {
            Assert::AreEqual(1u, GeneratorDriver::DriveAndReturnNumberOfMatches(65u, 8921u, 1056u, true));
        }

        TEST_METHOD(Initial65And8921For5MRunsMatches309TimesWhenPicky)
        {
            Assert::AreEqual(309u, GeneratorDriver::DriveAndReturnNumberOfMatches(65u, 8921u, 5u * 1000u * 1000u, true));
        }
    };
}
