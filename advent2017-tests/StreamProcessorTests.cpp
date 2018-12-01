#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2017/StreamProcessor.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2017;

unsigned StreamProcessor::TotalGroupScore = 0;

namespace advent2017tests
{
    TEST_CLASS(StreamProcessorTests)
    {
    public:
        TEST_METHOD(CanEatEmptyGarbage)
        {
            Assert::AreEqual("", StreamProcessor::EatGarbage("<>"));
        }

        TEST_METHOD(CanEatRandomGarbage)
        {
            Assert::AreEqual("", StreamProcessor::EatGarbage("<lkjghlig t>"));
        }

        TEST_METHOD(CanEatGarbageWithExtraStartingCharacters)
        {
            Assert::AreEqual("", StreamProcessor::EatGarbage("<<<<>"));
        }

        TEST_METHOD(CanEatGarbageWithEscapedEndingCharacter)
        {
            Assert::AreEqual("", StreamProcessor::EatGarbage("<{!>}>"));
        }

        TEST_METHOD(CanEatGarbageWithDoubleEscapeCharacter)
        {
            Assert::AreEqual("", StreamProcessor::EatGarbage("<!!>"));
        }

        TEST_METHOD(CanEatGarbageWithEscapedEscapeAndEndingCharacters)
        {
            Assert::AreEqual("", StreamProcessor::EatGarbage("<!!!>>"));
        }

        TEST_METHOD(CanEatGarbageWithEscapeAndExtraStartingCharacters)
        {
            Assert::AreEqual("", StreamProcessor::EatGarbage("<{o""i!a, <{i<a>"));
        }

        TEST_METHOD(CanEatOneGroupWithCountOfOne)
        {
            auto numGroups = 0u;
            Assert::AreEqual("", StreamProcessor::EatGroup("{}", numGroups));
            Assert::AreEqual(1u, numGroups);
        }

        TEST_METHOD(CanEatThreeNestedGroupsWithCountOfThree)
        {
            auto numGroups = 0u;
            Assert::AreEqual("", StreamProcessor::EatGroup("{{{}}}", numGroups));
            Assert::AreEqual(3u, numGroups);
        }

        TEST_METHOD(CanEatOneGroupNestingTwoWithCountOfThree)
        {
            auto numGroups = 0u;
            Assert::AreEqual("", StreamProcessor::EatGroup("{{},{}}", numGroups));
            Assert::AreEqual(3u, numGroups);
        }

        TEST_METHOD(CanEatVariouslyNestedGroupsWithCountOfSix)
        {
            auto numGroups = 0u;
            Assert::AreEqual("", StreamProcessor::EatGroup("{{{},{},{{}}}}", numGroups));
            Assert::AreEqual(6u, numGroups);
        }

        TEST_METHOD(CanEatGroupContainingGroupLikeGarbageWithCountOfOne)
        {
            auto numGroups = 0u;
            Assert::AreEqual("", StreamProcessor::EatGroup("{<{},{},{{}}>}", numGroups));
            Assert::AreEqual(1u, numGroups);
        }

        TEST_METHOD(CanEatGroupContainingMultipleGarbageWithCountOfOne)
        {
            auto numGroups = 0u;
            Assert::AreEqual("", StreamProcessor::EatGroup("{<a>,<a>,<a>,<a>}", numGroups));
            Assert::AreEqual(1u, numGroups);
        }

        TEST_METHOD(CanEatGroupContainingMultipleGroupedGarbageWithCountOfFive)
        {
            auto numGroups = 0u;
            Assert::AreEqual("", StreamProcessor::EatGroup("{{<a>},{<a>},{<a>},{<a>}}", numGroups));
            Assert::AreEqual(5u, numGroups);
        }

        TEST_METHOD(CanEatGroupContainingGroupWithGarbageAndEscapedEndingCharactersWithCountOfTwo)
        {
            auto numGroups = 0u;
            Assert::AreEqual("", StreamProcessor::EatGroup("{{<!>},{<!>},{<!>},{<a>}}", numGroups));
            Assert::AreEqual(2u, numGroups);
        }

        TEST_METHOD(CanScoreOneGroupAsOne)
        {
            StreamProcessor::TotalGroupScore = 0;
            auto numGroups = 0u;
            auto groupScore = 0u;
            (void)StreamProcessor::EatGroup("{}", numGroups, &groupScore);
            Assert::AreEqual(1u, StreamProcessor::TotalGroupScore);
        }

        TEST_METHOD(CanScoreThreeNestedGroupsAsSix)
        {
            StreamProcessor::TotalGroupScore = 0;
            auto numGroups = 0u;
            auto groupScore = 0u;
            (void)StreamProcessor::EatGroup("{{{}}}", numGroups, &groupScore);
            Assert::AreEqual(6u, StreamProcessor::TotalGroupScore);
        }

        TEST_METHOD(CanScoreOneGroupNestingTwoAsFive)
        {
            StreamProcessor::TotalGroupScore = 0;
            auto numGroups = 0u;
            auto groupScore = 0u;
            (void)StreamProcessor::EatGroup("{{},{}}", numGroups, &groupScore);
            Assert::AreEqual(5u, StreamProcessor::TotalGroupScore);
        }

        TEST_METHOD(CanScoreVariouslyNestedGroupsAsSixteen)
        {
            StreamProcessor::TotalGroupScore = 0;
            auto numGroups = 0u;
            auto groupScore = 0u;
            (void)StreamProcessor::EatGroup("{{{},{},{{}}}}", numGroups, &groupScore);
            Assert::AreEqual(16u, StreamProcessor::TotalGroupScore);
        }

        TEST_METHOD(CanScoreGroupContainingMultipleGarbageAsOne)
        {
            StreamProcessor::TotalGroupScore = 0;
            auto numGroups = 0u;
            auto groupScore = 0u;
            (void)StreamProcessor::EatGroup("{<a>,<a>,<a>,<a>}", numGroups, &groupScore);
            Assert::AreEqual(1u, StreamProcessor::TotalGroupScore);
        }

        TEST_METHOD(CanScoreGroupContainingMultipleGroupedGarbageAsNine)
        {
            StreamProcessor::TotalGroupScore = 0;
            auto numGroups = 0u;
            auto groupScore = 0u;
            (void)StreamProcessor::EatGroup("{{<ab>},{<ab>},{<ab>},{<ab>}}", numGroups, &groupScore);
            Assert::AreEqual(9u, StreamProcessor::TotalGroupScore);
        }

        TEST_METHOD(CanScoreGroupContainingMultipleGroupedGarbageWithEscapingAsNine)
        {
            StreamProcessor::TotalGroupScore = 0;
            auto numGroups = 0u;
            auto groupScore = 0u;
            (void)StreamProcessor::EatGroup("{{<!!>},{<!!>},{<!!>},{<!!>}}", numGroups, &groupScore);
            Assert::AreEqual(9u, StreamProcessor::TotalGroupScore);
        }

        TEST_METHOD(CanScoreGroupContainingGroupWithGarbageAndEscapedEndingCharactersAsThree)
        {
            StreamProcessor::TotalGroupScore = 0;
            auto numGroups = 0u;
            auto groupScore = 0u;
            (void)StreamProcessor::EatGroup("{{<a!>},{<a!>},{<a!>},{<ab>}}", numGroups, &groupScore);
            Assert::AreEqual(3u, StreamProcessor::TotalGroupScore);
        }
    };
}
